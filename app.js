//Data
let listWork = [{
    status: true,
    content: 'Create the calculator app'
},{
    status: true,
    content: 'Additional articles'
},{
    status: true,
    content: 'Create the to do list app'
},{
    status: false,
    content: 'Create your own javascript app'
},{
    status: false,
    content: 'Learn ReactJS'
}
]
let list = document.getElementById('list');
let node = null;

//Render view
function render() {
    list.innerHTML = '';
    if(listWork.length != 0){
        listWork.forEach((e, index) => {
            let status = e.status?'checked':'';
            list.innerHTML += `<div class="item" id = ${index}>
            <input class='status' ${status} type="checkbox"/>
            <span></span> ${e.content}
            <i class="fa fa-times" aria-hidden="true" id="delete"></i>
            </div>`;
        })
    }
    else {
        list.innerHTML = 'Add new work!';
    }
}
render();

//Handle select item
addEventListener('mousedown', (e) => {
    if(e.target.matches('span')){
        let parent = e.target.closest('.item');
        let clone = parent.getBoundingClientRect();
        node = document.createElement('div');
        node.className = "item";
        node.id = parent.id;
        node.innerHTML = `
        <input class='status' ${listWork[parent.id].status?'checked':''} type="checkbox"/>
        <input type="checkbox"/>
        <span></span> 
        ${listWork[parent.id].content}`;
        node.style = `position:fixed;
                    top:${clone.y}px;
                    left:${clone.x}px;
                    background-color:#cccc;
                    width:${clone.width - 42}px;
                    z-index:100;
                    `
        list.appendChild(node);
    }
    //Checkbox complete or notyet
    else if(e.target.matches('.status')){
        let parent = e.target.closest('.item');
        listWork[parent.id].status = !listWork[parent.id].status;
    }
})

//Handle drag item
addEventListener('mousemove', (e) => {
    if(node != null){
        let height = document.getElementsByClassName('item')[0].getBoundingClientRect().height/2;
        node.style.top = (e.clientY - height) + 'px';
    }
})

//Handle mouse up
addEventListener('mouseup', (e) => {
    //Delete work
    if(e.target.matches('#delete')){
        listWork.splice(parent.id,1);
    } 
    //ADD new work
    else if(e.target.matches('#add-work')){
        let text = document.getElementById('input-text');
        if(text.value != ''){
            let newWork = {status:false,content:text.value};
            listWork.push(newWork);
            text.value = '';
        }
    }
    
    //Handle drop item and change position of list work
    else if(node != null){
        //position drop item
        let drop = document.elementsFromPoint(e.clientX,e.clientY)[1].closest('.item');
        if(drop != null){
            let balanceItem = (drop.getBoundingClientRect().bottom + drop.getBoundingClientRect().top)/2;
            let index = drop.id;
            if(e.clientY >= balanceItem){
                index++;
            }
            let str = listWork[node.id];
            listWork.splice(index,0,str);     
            if(node.id > index){
                listWork.splice((node.id * 1 + 1),1);
            }else{
                listWork.splice(node.id,1);
            }
        }
        node = null;
    }
    render();
})
