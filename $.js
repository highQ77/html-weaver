class Builder{

    /**
     * builder tag id
     */
    _id = 'tag'

    /**
     * builder tag instance
     */
    _tag

    /**
     * parent builder
     */
    _parent = null

    /**
     * child builders
     */
    _children = null

    /**
     * set tag name with constructor
     * @param {string} tagName the builder tagName
     */
    constructor(tagName){
        this._tag = document.createElement(tagName ? tagName : 'div')
    }

    /**
     * set id
     * @param {string} id the builder id
     * @returns this
     */
    id(id){
        this._id = id
        return this
    }

    /**
     * get html tag from builder
     * @returns HTMLElement
     */
    tag(){
        return this._tag   
    }

    /**
     * get html string from builder
     * @returns string
     */
    html(){
        return this._tag.outerHTML
    }

    /**
     * set tag css className
     * @param {string} class the tag className
     * @returns this
     */
    class(classes){
        this._tag.className = classes
        return this
    }

    /**
     * set tag css style
     * @param {string} style the tag style
     * @returns this
     */
    style(style){
        this._tag.style = style
        return this
    }

    /**
     * set content of builder
     * @param {Array|string} slot the array of builder or label string
     * @returns this
     */
    slot(slot) {
        if(Array.isArray(slot)){
            slot.forEach($ => {
                $._parent = this
                this._tag.appendChild($._tag)
            })
            this._children = [...slot]
        }else{
            this._tag.innerHTML = slot
        }
        return this
    }

    /**
     * remove element from builder
     */
    remove(){
        this._children.forEach(ch=>ch.remove())
        this._children.length = 0
        this._children = null
        this._parent = null
        this._id = 'tag'
        this._tag.remove()
        this._tag = null
    }
}

export default (tag) => new Builder(tag)

/** utils for builder's operation */
export const utils = {
    /** get all ids & instance */
    getIds: ($, ids=[], isChild=false) => {
        if($._id != 'tag') ids.push($)
        if($._children?.length){
            for(let i = 0; i < $._children.length; i++){
                utils.getIds($._children[i],ids,true)
            }
        }
        if(isChild) return
        let kv = {}
        ids.forEach($=>kv[$._id] = $)
        return kv
    }
}