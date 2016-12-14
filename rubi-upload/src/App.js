import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import request from 'superagent'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    request.post('http://localhost:8080/upload').attach('theFile',this.state.file).end((err, res) => {
        console.log(err);
        console.log(res);
    })
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
      <form onSubmit={(e)=>this._handleSubmit(e)}>
      <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
      <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
      </form>
      <div className="imgPreview">
      {$imagePreview}
      </div>
      </div>
    )
  }
}

export default App;
