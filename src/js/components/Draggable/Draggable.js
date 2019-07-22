import React from 'react';
import { connect } from 'react-redux';
import { getItemsPosition, isAboveOtherItem } from './utils/functions';
import { changeListPosition } from '../../../redux/actions/tableaux';

import './Draggable.css';

class Draggable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            initialPosition: {x: 0, y: 0},
            mousePositionOnClick: 0,
            mouseRelativePosition: 0,
            hoveredItemPosition: false,
            isMouseDown: false,
        }
        this.draggableContainer = React.createRef();
    }



    componentDidMount(){
        this.setState({
            initialPosition: {x: this.draggableContainer.getBoundingClientRect().left, y: this.draggableContainer.getBoundingClientRect().top}
        })
    }

    onMouseDown = (event) => {
        this.setState({
            isMouseDown: true,
            mousePositionOnClick: event.pageX
        })
    }
    onMouseUp = () => {
        this.setState({
            isMouseDown: false,
            mousePositionOnClick: -1,
            mouseRelativePosition: 0
        });
        if(this.state.hoveredItemPosition >= 0 && this.state.hoveredItemPosition !== this.props.position && this.state.hoveredItemPosition !== false){
            
            this.props.dispatch(changeListPosition(this.props.item, this.props.position, this.state.hoveredItemPosition))
        }
        this.props.reinitTranslation();
    }
    onMouseMove = (event) => {
        if(this.state.isMouseDown){
            this.setState({
                mouseRelativePosition: event.pageX - this.state.mousePositionOnClick,
                hoveredItemPosition: isAboveOtherItem(getItemsPosition('liste'), this.state.mouseRelativePosition, this.state.initialPosition.x)
            }, () => this.props.itemIsHovered(this.state.hoveredItemPosition));
        } 
    }
    render(){
        return(
            <div 
            onMouseDown={this.onMouseDown} 
            onMouseMove={this.onMouseMove} 
            onMouseUp={this.onMouseUp} 
            ref={element => this.draggableContainer = element}
            className="draggable__container"
            style={{transform: 'translateX(' + (this.state.mouseRelativePosition + this.props.translation) + 'px)', zIndex: (this.state.isMouseDown ? 30 : 1)}}
            >

                {this.props.children}

            </div>
        )
    }
}


export default connect()(Draggable);