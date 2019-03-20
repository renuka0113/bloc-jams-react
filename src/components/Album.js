import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

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
           isPlaying: false,
           hoveredSong:null
         };
         this.audioElement = document.createElement('audio');{/*creating a new audio element */}
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

handleMouseEnter(index){
 this.setState({hoveredSong:index});
}

handleMouseLeave(){
  this.setState({hoveredSong:null});
}

renderIcon(index){
let isCurrentSong = this.state.album.songs.indexOf(this.state.currentSong)===index;
if(isCurrentSong && !this.state.isPlaying){
  return <td><span className="ion-play"><i className="ion-md-play"></i></span></td>
}
if(this.state.hoveredSong===index){
return <td><span className="ion-play"><i className="ion-md-play"></i></span></td>
}else if(this.state.hoveredSong==null && this.state.isPlaying && isCurrentSong){
  return  <td><span className="ion-pause"><i className="ion-md-pause"></i></span></td>
}else{
  return <td>{index+1}</td>
}
}

handlePrevClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex - 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
    }

    handleNextClick(){
    const presentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    console.log(presentIndex);
    console.log(this.state.album.songs.length);
    const noOfSongs = this.state.album.songs.length;
    console.log(noOfSongs);
    const nextIndex = presentIndex+1;
    console.log(nextIndex);
    if(nextIndex === noOfSongs){
      var newNextIndex = presentIndex;
    }else{
      console.log("inside else");
      newNextIndex = Math.min(noOfSongs,nextIndex);
      console.log(newNextIndex);
    }
    const newNextSong = this.state.album.songs[newNextIndex];
    console.log(newNextSong);
    this.setSong(newNextSong);
    this.play();
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
              <tr key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={()=>this.handleMouseEnter(index)} onMouseLeave={()=>this.handleMouseLeave()}>
            <td>{this.renderIcon(index)}</td>
            <td>  {song.title} </td>
            <td>  {song.duration}</td>
              </tr>
            )
          }
           </tbody>
          </table>
          {/* The play data is contained in Album state, but we'll need to access it in PlayerBar, so here we pass down
          isPlaying and currentSong to PlayerBar as props.*/}
          {/*So, isPlaying,currentSong,handleSongClick,handlePrevClick,handleNextClick are all passed down as props from Album.js to PlayerBar */}
          <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={()=>this.handleNextClick()}
        />
         </section>
         );
       }
     }

export default Album;
