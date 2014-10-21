// -*- coding: utf-8 -*-
//
// **********
// sliding.js
// **********
//
// The sliding.js may be freely distributed under the MIT license.
// For all details and documentation:
//
// https://github.com/TakesxiSximada/sliding.js
//
// Copyright (C) 2014 TakesxiSximada
//

(function (global){
    'use strict';
    if (global.Sliding){
        return;
    }

    global.Sliding = function (options){
        var api_url = options.api_url;
        var slide_view_tmpl = options.slide_view_tmpl;
        var slide_list_view_tmpl = options.slide_list_view_tmpl;
        var slide_view_container = options.slide_view_container;
        var slide_search_input = options.slide_search_input;
        var slide_search_tmpl = options.slide_search_tmpl;
        var main_region = options.main_region;
        var storage_name = options.storage_name;

        var app = new Backbone.Marionette.Application();
        app.module('Models', function (Models, App, Backbone, Marionette, $, _){
            Models.Slide = Backbone.Model.extend({
                defaults: {
                    title: '',
                    url: '',
                    thumbnail: '',
                    is_display: true
                },
                initialize: function(data){
                    this.title = data.title,
                    this.url = data.url;
                    this.thumbnail = data.thumbnail;
                    this.is_display = this.defaults.is_display;
                }
            });

            Models.SlideList = Backbone.Collection.extend({
                model: Models.Slide,
                localStorage: new Backbone.LocalStorage(storage_name)
            });
        });

        app.module('Views', function(Views, App, Backbone, Marionette, $, _){
            Views.SlideView = Marionette.ItemView.extend({
                template: slide_view_tmpl,
                modelEvents: {
                    'change': 'render'
                },
                onRender: function (){
                    this.update();
                },
                update: function (){
                    this.$el.fadeOut('slow');
                    if (this.model.is_display){
                        this.$el.fadeIn('slow');
                    }
                }
            });

            Views.SlideListView = Marionette.CompositeView.extend({
                template: slide_list_view_tmpl,
                childViewContainer: slide_view_container,
                childView: Views.SlideView,
                modelEvents: {
                    'change': 'render'
                },
                // search
                ui: {
                    input: slide_search_input
                },
                events: {
                    'keypress @ui.input': 'onInputKeypress'
                },
                onInputKeypress: function(event){
                    var value = this.ui.input
                        .val()
                        .trim()
                        .toUpperCase();
                    if(event.which == 13 && value){ // enter
                        this.collection.each(function (slide){
                            slide.is_display = slide.title.toUpperCase().indexOf(value) !== -1 ? true : false;
                        });
                        this.children.each(function (view){
                            view.update();
                        });
                    }
                }
            });
        });

        app.module('Slides', function(Slides, App, Backbone, Marionette, $, _){
            Slides.Router = Marionette.AppRouter.extend({
                appRoutes: {
                    '*search': 'search'
                }
            });

            Slides.Controller = function(){
                this.slideList = new App.Models.SlideList();
            };

            _.extend(Slides.Controller.prototype, {
                start: function(){
                    this._install_slide_list_view();
                },
                _install_slide_list_view: function () {
                    var view = new App.Views.SlideListView({
                        collection: this.slideList
                    });
                    this.load();
                    App.main.show(view);
                },
                load: function(){
                    var slideList = this.slideList;
                    $.ajax(api_url, {
                        type: 'GET',
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        success: function(datas){
                            $.each(datas, function(ii, data){
                                slideList.add(new App.Models.Slide(data));
                            });
                        },
                        error: function(xhr, text){
                            console.log("API ERROR");
                        }
                    });
                },
                search: function(){
                    console.log("controller search");
                }
            });

            Slides.addInitializer(function(){
                var controller = new Slides.Controller();
                controller.router = new Slides.Router({
                    controller: controller
                });
                controller.start();
            });
        });

        app.addRegions({
            main: main_region
        });

        app.on('start', function(){
            Backbone.history.start();
        });
        return app;
    };
})(this);
