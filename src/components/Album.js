import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);
{/* Now we want to set album property on our state.*/}
{/* First we need to find the album object in albumData which has the slug property equal to
this.props.match.params.slug*/}
{/*Here, we are find that album object from albumData using .find(), whose slug property will equal
this.props.match.params.slug */}

const album = albumData.find( album => {
return album.slug === this.props.match.params.slug
         });
{/*Here we set the property of the state */}

this.state = {
           album: album,


           currentSong: album.songs[0],


           isPlaying: false
         };
         this.audioElement = document.createElement('audio'); {/*creating a new audio element */}
         this.audioElement.src = album.songs[0].audioSrc;{/*set the src property of this.audioElement to the audio source of the first song on the album;because we expect the playback to start with the first song of the album*/}
       }

     play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }


   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }

   setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
  }

handleMouseEnter(song){

   this.setState({hover:true});
  

  }


handleMouseLeave(song){
  this.setState({hover:false});

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
           {
           this.state.album.songs.map( (song, index) =>
              <tr key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={()=>this.handleMouseEnter(song)} onMouseLeave={()=>this.handleMouseLeave(song)}>
              {this.state.hover?<td><span className="ion-play"><ion-icon name="play"></ion-icon></span></td>:<td>{index+1}</td>}
            <td>  {song.title} </td>
            <td>  {song.duration}</td>
              </tr>
            )
          }
           </tbody>
          </table>
         </section>
         );
       }
     }

export default Album;
