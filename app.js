// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.get('/artists/latest', (req, res) => {
  const artist = getLatestArtist();
  res.json(artist)
})

app.post('/artists/:artistId/albums', (req, res) => {
  const album = addAlbumByArtistId(+req.params.artistId, req.body)
  console.log(album)
  console.log(req)
  res.json(album)
})

app.get('/artists/latest/albums', (req, res) => {
  const latestAlbums = getAlbumsForLatestArtist();
  res.json(latestAlbums);
})

app.use(express.json())   //разрешили использовать JSON

app.get('/artists/:artistId', (req, res)=> {
  const artist = getArtistByArtistId(req.params.artistId);
  console.log(artist)
  if (!artist.artistId){
    
    res.status(404).send('Not Found')
  }
  //const albums = getAlbumsByArtistId(req.params.artistId)
  res.json(artist)
})

app.put('/artists/:artistId', (req,res)=>{
  const artist = getArtistByArtistId(req.params.artistId);
  if (!artist.artistId){
    
    res.status(404).send('Not Found')
  }

  const updatedArtist =  editArtistByArtistId(artist.artistId, req.body)
  
  res.json(updatedArtist)
})

app.delete('/albums/:albumId', (req,res) => {
  const album = getAlbumByAlbumId(req.params.albumId)
  console.log(album)
  if(!album.albumId){
    res.status(404).send("No album")
  }
  
  deleteAlbumByAlbumId(album.albumId)

  res.send('deleted')


})

app.get('/albums', (req, res)=>{
  const album = getFilteredAlbums(req.query.startsWith);
  res.json(album)
})

app.get('/artists/:artistId/songs', (req,res) =>{

  const artist = getArtistByArtistId(req.params.artistId);
  if (!artist.artistId){
    
    res.status(404).send('Not Found')
  }

  
  const songs = getSongsByArtistId(artist.artistId);

  res.json(songs);

})

app.get('/albums/:albumId/songs', (req, res) => {
  const songs = getSongsByAlbumId(req.params.albumId);
  res.json(songs)
})


app.get('/songs/:songId', (req, res) =>{
  const songsDetails = getSongBySongId(req.params.songId);
  res.json(songsDetails);
  
})

app.post('/albums/:albumId/songs', (req, res) => {
  res.json(addSongByAlbumId(req.params.albumId, req.body))
})

app.put('/songs/:songId', (req, res) => {
  res.json(editSongBySongId(req.params.songId, req.body))
})


app.delete('/songs/:songId', (req, res) => {
  res.send(deleteSongBySongId(req.params.songId))
})
app.post('/artists', (req, res)=>{
  res.json(addArtist(req.body))
})






const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));