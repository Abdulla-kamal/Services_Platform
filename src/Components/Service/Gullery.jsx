export default function Gullery({pictures}) {
    return(
        <div className="gallery" id="gallery">
        <h2 className="main-title">Gallery</h2>
  
        <div className="container">
      {  pictures && pictures.map((pictures, index)=> 
       <div className="box" key={index}>
       <div className="image">
         <img src={pictures} alt="" />
       </div>
     </div>)}
        </div>
      </div>
    );
}