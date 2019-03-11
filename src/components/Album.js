import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    //Now we want to set album property on our state.
    //First we need to find the album object in albumData which has the slug property equal to this.props.match.params.slug
//Here, we are find that album object from albumData using .find(), whose slug property will equal this.props.match.params.slug


    const album = albumData.find( album => {
           return album.slug === this.props.match.params.slug
         });

//Here we set the property of the state
         this.state = {
           album: album
         };
       }



  render() {
    return (
      <section className="album">
      <section id="album-info">
      <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
      <div className="album-details">
      <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>


        </div>
     </section>
     <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
           this.state.album.songs((song,index)=>
           <tr key={index}>
           {this.album.songs.title}
           {this.album.songs.duration}
           </tr>
           </tbody>
         </table>
         </section>

    );
  }
}

export default Album;
