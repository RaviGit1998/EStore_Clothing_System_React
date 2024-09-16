import React from 'react'
function Homepage() {
  return (
    <> 
 <div id="carouselExampleDark" class="carousel carousel-dark slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" style={{height:'490px'}}>
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="womenSlideimg.png" className="d-block w-100 height" alt="women"></img>
      <div class="carousel-caption d-none d-md-block">
        <h5>IndoWestern Clothes</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="menslideimg.png"  className="d-block w-100" alt="men"></img>
      <div class="carousel-caption d-none d-md-block">
        <h5>classic Men clothing</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="kidSlideimg.png"  className="d-block w-100" alt="kid"></img>
      <div class="carousel-caption d-none d-md-block">
        <h5>Traditional Kids Wear</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>      
    </>
  )
}

export default Homepage