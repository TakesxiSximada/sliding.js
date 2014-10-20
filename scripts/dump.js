// -*- coding: utf-8 -*-
(function (){
    var system = require('system');
    var webpage = require('webpage');
    var url = system.args[1];
    var thumbnail = system.args[2];

    var page = webpage.create();
    page.open(url, function (status){
        var title = page.evaluate(function (){
            return document.title;
        });
        page.render(thumbnail);
        console.log(JSON.stringify({
            title: title,
            url: url,
            thumbnail: thumbnail
        }));
        phantom.exit();
    });
})();
