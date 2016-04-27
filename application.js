angular.module('todo', [])
    .controller('page', ['$scope','todoApi',

function ($s,todoApi) {
    $s.editorEnabled = false;
    $s.moveIndex = 1;
    var uiCurrent = 1;
    $s.totalTab;
    $s.tabs;
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
    /*
    Data adapter from todoApi
    it should look like this
    $s.tabs = [{
        title: 'shopping',
        number: 1,
        list : [{
        name: 'buy eggs',
        complete: false
    }];*/
    var getData = function(){
        $s.tabs = [];
        $s.totalTab = 0;
        var data = todoApi.query();
        var contain;
        for(var i = 0; i < data.length ; i++){
            contain = false;
            for(var j = 0; j < $s.tabs.length ; j++){
                if(data[i].list == $s.tabs[j].title){
                    contain = true;
                    $s.tabs[j].list.push({
                        name: data[i].name,
                        complete: data[i].complete
                    });
                    break;
                }
            }
            if(contain == false){
                $s.totalTab++;
                $s.tabs.push({
                    title: data[i].list,
                    number: $s.totalTab,
                    list: [{
                        name: data[i].name,
                        complete: data[i].complete
                    }]
                });
            }
        }
    }
    getData();

    $s.create = function(){
        /* create new tab
        if it's build up and not in use, later on it will collapse itself */
        $s.totalTab++;
        $s.tabs.push({
            title: $s.newTabName,
            number: $s.totalTab,
            list: []
        });
        $s.newTabName = "";
    }
    $s.add = function(tab, newList){
        // create on todoApi
        todoApi.create({
            list: tab.title,
            name: newList,
            complete: false
        });
        getData();     
    }
    var printData = function(){
        // use for debug
        var data = todoApi.query();
        for(var i=0 ; i < data.length ;i++){
            console.log("list: "+data[i].list+"\n name: "+data[i].name+"\n complete: "+data[i].complete);
        }
    }
    $s.update = function(){
        //update todoApi
        var count=0;
        for(var i=0 ; i< $s.tabs.length ;i++){
            for(var j=0; j< $s.tabs[i].list.length; j++){
                todoApi.update(count,{
                    list: $s.tabs[i].title,
                    name: $s.tabs[i].list[j].name,
                    complete: $s.tabs[i].list[j].complete
                });
                count++;
            }
        }
    }
    $s.moveToTab = function(ToList,currentList,item){
        // transfer item and update todoApi
        currentList -= 1;
        ToList -= 1;
        $s.tabs[ToList].list.push(item);
        for(var i = 0 ; i<$s.tabs[currentList].list.length ; i++){
            if($s.tabs[currentList].list[i].name == item.name){   
                if($s.tabs[currentList].list.length == 1){
                    $s.totalTab--;
                 }   
                $s.tabs[currentList].list.splice(i, 1);
            }
        }
        $s.update();
        getData();
    }
}])
    .factory('todoApi', [function () {
    var data = [
        {
            list: 'Shopping',
            name: 'buy eggs',
            complete: false
        }, 
        {
            list: 'Shopping',
            name: 'buy milk',
            complete: true
        },
        {
            list: 'Business',
            name: 'collect underpants',
            complete: false
        }, 
        {
            list: 'Business',
            name: '...',
            complete: false
        }, 
        {
            list: 'Business',
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

