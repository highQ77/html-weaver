class Base {
    _id = 'tag'
    _tag
    _parent = null
    _children = null

    constructor(tag){
        this._tag = document.createElement(tag ? tag : 'div')
    }

    // instance id
    id(id){
        this._id = id
        return this
    }

    // get tag
    tag(){
        return this._tag   
    }

    // get html
    html(){
        return this._tag.outerHTML
    }

    // css class
    class(cls){
        this._tag.className = cls
        return this
    }

    // css style
    style(stl){
        this._tag.style = stl
        return this
    }

    // Base array or label string
    slot(ch) {
        if(Array.isArray(ch)){
            ch.forEach($ => {
                $._parent = this
                this._tag.appendChild($._tag)
            })
            this._children = [...ch]
        }else{
            this._tag.innerHTML = ch
        }
        return this
    }
}

export default (tag) => new Base(tag)

export const utils = {
    /** get all ids & instance */
    getIds: ($, ids=[], isChild=false) => {
        if($._id != 'tag') ids.push($)
        if($._children?.length){
            for(let i = 0; i < $._children.length; i++){
                utils.getIds($._children[i],ids,isChild)
            }
        }
        let kv = {}
        ids.forEach($=>kv[$._id] = $)
        return kv
    }
}