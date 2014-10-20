// -*- coding: utf-8 -*-
(function (global){
    'use strict';

    // include guard
    if (global.sliding){
        return;
    }

    var API_SLIDES_URL = '/api/slides.json';
    var app = new Backbone.Marionette.Application();

    app.module('Models', function(Models, App, Backbone, Marionette, $, _){
        Models.Slide = Backbone.Model.extend({
            default: {
                title: '',
                url: '',
                thumbnail: '',
                is_display: true
            },

            initialize: function (data){
                this.title  = data.title;
                this.url = data.url;
                this.thumbnail = data.thumbnail;
                this.is_display = this.default.is_display;
            }
        });

        Models.SlideList = Backbone.Collection.extend({
            model: Models.Slide,
            logalStorage: new Backbone.LocalStorage('sliding')
        });
    });

    app.module('Views', function (Views, App, Backbone, Marionette, $, _){
        Views.SlideView = Marionette.ItemView.extend({
            template: '#template-slide-view',
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
            },
            is_unmatch_status: function (){
                return true;
            }
        });

        Views.SlideListView = Marionette.CompositeView.extend({
            template: '#template-slide-list-view',
            childViewContainer: '#slide-list',
            childView: Views.SlideView,
            modelEvents: {
                'change': 'render'
            },
            // search
            ui: {
                input: '#search-slide'
            },

            events: {
                'keypress @ui.input': 'onInputKeypress'
            },

            onInputKeypress: function (event){
                var value_org = this.ui.input.val();
                var value = value_org.trim().toUpperCase();
                if (event.which == 13 && value){
                    this.collection.each(function (slide){
                        slide.is_display = slide.title.toUpperCase().indexOf(value) !== -1 ? true : false;
                    });
                    this.children.each(function (view){
                        view.update();
                    });
                }
            }
        });

        Views.SearchBoxView = Marionette.ItemView.extend({
            template: '#template-slide-search',
            onInputKeypress: function (event){
                var ENTER_KEY = 13;
                var name = this.ui.input.val().trim();
                if(event.which === ENTER_KEY && name){
                    this.collection.each(function (slide){
                        slide.is_display = false;
                    });

                }
            }
        });
    });

    app.module('Slides', function (Slides, App, Backbone, Marionette, $, _){
        Slides.Router = Marionette.AppRouter.extend({
            appRoutes: {
                '*search': 'search'
            }
        });

        Slides.Controller = function (){
            this.slideList = new App.Models.SlideList();
        };

        _.extend(Slides.Controller.prototype, {
            start: function (){
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
                $.ajax(API_SLIDES_URL, {
                    type: 'GET',
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    success: function(datas){
                        $.each(datas, function (ii, data){
                            slideList.add(new App.Models.Slide(data));
                        });
                    },
                    error: function(xhr, text) {
                        console.log("API ERROR");
                    }
                });
            },
            search: function (){
                console.log("controller search");
            }
        });

        Slides.addInitializer(function (){
            var controller = new Slides.Controller();
            controller.router = new Slides.Router({
                controller: controller
            });
            controller.start();
        });
    });

    app.addRegions({
        main: '#content'
    });

    // entry point
    app.on('start', function (){
        Backbone.history.start();
    });

    // exports
    global.sliding = app;
})(this);
