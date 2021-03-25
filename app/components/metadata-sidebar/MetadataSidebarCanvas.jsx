var React = require('react');
var {connect} = require('react-redux');
var manifesto = require('manifesto.js');
var Utils = require('Utils');

var MetadataSidebarCanvas = React.createClass({
  getMainImage: function(canvas) {
    return canvas !== null && canvas.getImages().length > 0 
      ? canvas.getCanonicalImageUri(100)
      : '/iiif-manifest-editor/img/empty-canvas.png';
  },
  render: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return (
      <div style={{background: '#fff url(./img/loading-small.gif) no-repeat center center'}} className="metadata-sidebar-canvas">
        <img src={this.getMainImage(canvas)} alt={canvas !== null ? Utils.getLocalizedPropertyValue(canvas.getLabel()) : ''} height="150" />
        <div className="canvas-label">
          {canvas !== null ? Utils.getLocalizedPropertyValue(canvas.getLabel()) : 'Empty canvas'}
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject
    };
  }
)(MetadataSidebarCanvas);
