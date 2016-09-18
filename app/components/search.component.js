import React from 'react';
import AutoComplete from 'react-autocomplete'

class Search extends React.Component {

  handleRenderItem(item, isHighlighted){
    // Some basic style
    const listStyles = {
      item: {
        padding: '2px 6px',
        cursor: 'default'
      },

      highlightedItem: {
        color: 'white',
        background: '#F38B72',
        padding: '2px 6px',
        cursor: 'default'
      }
    };
    const imgStyle ={
      small: {
        width:'50px',
        height:'50px'
      }
    }
    // Render list items
    return (
      <div
        style={isHighlighted ? listStyles.highlightedItem : listStyles.item}
        key={item.id}
        id={item.id}
      ><img style={imgStyle.small} src={item.profile_image_url}/>{item.name}: {item.screen_name}</div>
    )
  }
  sortNames(name){
    for(var i =1;i<this.props.names.length;i++){
      if(this.props.names[i].screen_name===this.props.autoCompleteValue){
        var temp = this.props.names[0];
        this.props.names[0] = this.props.names[i];
        this.props.names[i] = temp;
      }
    }
  }

  render(){
      let _this = this;

    return(
      <div className="wrapper">
        <h3>{this.props.header}</h3>
        <div className="ui left icon input">
          <AutoComplete placeholder={this.props.placeholder} ref = "autocomplete"
            inputProps = {{title:"title"}}
            value = {this.props.autoCompleteValue}
            items = {this.props.names}
            sortItems={this.sortNames.bind(this)}
            getItemValue={(item)=>item.screen_name}
            onSelect = {this.props.handleSelect}
            onChange={this.props.handleChange}
            renderItem={this.handleRenderItem.bind(this)}
          />
          <i className="icon at"></i>
        </div>
        <br/><br/>
        <button className ="block ui button inverted" onClick={this.props.onSubmit}>{this.props.buttonText}</button>
      </div>
    )
  }

}

export default Search
