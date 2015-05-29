angular.module('todo', [])
    .controller('page', ['$scope',

function ($s) {
    $s.editorEnabled = false;
    var uiCurrent = 1;
    var totalTab = 2;
    $s.ui = {
        current: function (newUICurrent) {
            if (typeof newUICurrent != 'undefined') {
                uiCurrent = newUICurrent;
            }
            return uiCurrent;
        },
        isCurrent: function (c) {
            return (uiCurrent === c);
        }
    };

    $s.tabs = [{
        title: 'Shopping',
        number: 1,
        list : [{
        name: 'buy eggs',
        complete: false
    }, {
        name: 'buy milk',
        complete: true
    }]},{
        title: 'Business',
        number: 2,
        list : [{
        name: 'collect underpants',
        complete: false
    }, {
        name: '...',
        complete: false
    }, {
        name: 'profit',
        complete: false
    }]}
    ];
    $s.create = function(){
        totalTab++;
        $s.tabs.push({
            title: $s.newTabName,
            number: totalTab,
            list: []
        });
        $s.newTabName = "";
    }
    $s.add = function(tab, newList){
        tab.list.push({
            name: newList,
            complete: false
        })      
    }
    $s.moveToTab = function(index,item){
        trans = item
    }
}])
    .controller('tab1', ['$scope',

function ($s) {
    $s.editorEnabled = false;
    $s.list = [{
        name: 'buy eggs',
        complete: false
    }, {
        name: 'buy milk',
        complete: true
    }];
    $s.add = function() {
        $s.list.push({
            name: $s.newList,
            complete: false
        });
        $s.newList = "";
    };
}])
    .factory('todoApi', [function () {
    var data = [
        {
            list: 'shopping',
            name: 'buy eggs',
            complete: false
        }, 
        {
            list: 'shopping',
            name: 'buy milk',
            complete: true
        },
        {
            list: 'business',
            name: 'collect underpants',
            complete: false
        }, 
        {
            list: 'business',
            name: '...',
            complete: false
        }, 
        {
            list: 'business',
            name: 'profit',
            complete: false
        }
    ];
    return {
        query: function () {
            return data;
        },
        get: function (id) {
            return data[id];
        },
        create: function(obj) {
            data.push(obj);
            return obj;
        },
        update: function(id, obj) {
            data[id] = obj;
            return obj;
        },
        destroy: function(id) {
            data.splice(id, 1);
            return data;
        }
    };
}]);

