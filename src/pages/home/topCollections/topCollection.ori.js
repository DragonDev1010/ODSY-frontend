import itemImg2 from '../../assets/img/items/2.jpg'
import avatarImg2 from '../../assets/img/avatars/2.jpg'
import itemImg3 from '../../assets/img/items/3.jpg'
import avatarImg3 from '../../assets/img/avatars/3.jpg'
import itemImg4 from '../../assets/img/items/4.jpg'
import avatarImg4 from '../../assets/img/avatars/4.jpg'
import itemImg5 from '../../assets/img/items/5.jpg'
import avatarImg5 from '../../assets/img/avatars/5.jpg'
import itemImg6 from '../../assets/img/items/6.jpg'
import avatarImg6 from '../../assets/img/avatars/6.jpg'
import itemImg7 from '../../assets/img/items/7.jpg'
import avatarImg7 from '../../assets/img/avatars/7.jpg'
import itemImg8 from '../../assets/img/items/8.jpg'
import avatarImg8 from '../../assets/img/avatars/8.jpg'
import * as FaIcons from 'react-icons/fa'

function TopCollections() {
    return (
        <section className = "explore-area">
			<div className = "container">
				<div className = "row row--grid">
					{/* title */}
					<div className = "col-12">
						<div className = "main__title">
							<h2><a href="explore-all.html">Explore</a></h2>
						</div>
					</div>
					{/* end title */}

					{/* carousel */}
					<div className = "col-12">
						<div className = "main__carousel-wrap">
							<div className = "main__carousel main__carousel--explore owl-carousel" id="explore">
								<div className = "card">
									<a href="item.html" className = "card__cover">
										<img src={itemImg8} alt="" />
									</a>
									<h3 className = "card__title"><a href="item.html">Awesome Color
											Drop</a></h3>
									<div className = "card__author card__author--verified">
										<img src={avatarImg8} alt=""/>
										<a href="author.html">@morgan28</a>
									</div>
									<div className = "card__info">
										<div className = "card__price">
											<span>Sale price</span>
											<span>9.21 ETH</span>
										</div>

										<button className = "card__likes" type="button">
											<i className = "far fa-heart"></i>
											<span>6k</span>
										</button>
									</div>
								</div>

								<div className = "card">
									<a href="item.html" className = "card__cover">
										<img src={itemImg7} alt=""/>
									</a>
									<h3 className = "card__title"><a href="item.html">Beautiful Leaf In The Wall</a></h3>
									<div className = "card__author card__author--verified">
										<img src={avatarImg7} alt=""/>
										<a href="author.html">@nessler520</a>
									</div>
									<div className = "card__info">
										<div className = "card__price">
											<span>Sale price</span>
											<span>1.22 ETH</span>
										</div>

										<button className = "card__likes" type="button">
											<i className = "far fa-heart"></i>
											<span>8k</span>
										</button>
									</div>
								</div>

								<div className = "card">
									<a href="item.html" className = "card__cover">
										<img src={itemImg6} alt=""/>
									</a>
									<h3 className = "card__title"><a href="item.html">Blue Planet Revolution</a></h3>
									<div className = "card__author card__author--verified">
										<img src={avatarImg6} alt=""/>
										<a href="author.html">@kimberly28</a>
									</div>
									<div className = "card__info">
										<div className = "card__price">
											<span>Sale price</span>
											<span>9.10 ETH</span>
										</div>

										<button className = "card__likes" type="button">
											<i className = "far fa-heart"></i>
											<span>80k</span>
										</button>
									</div>
								</div>

								<div className = "card">
									<a href="item.html" className = "card__cover">
										<img src={itemImg5} alt=""/>
									</a>
									<h3 className = "card__title"><a href="item.html">Colorful Fantacy
											Flowers</a></h3>
									<div className = "card__author card__author--verified">
										<img src={avatarImg5} alt=""/>
										<a href="author.html">@patricia458</a>
									</div>
									<div className = "card__info">
										<div className = "card__price">
											<span>Sale price</span>
											<span>4.25 ETH</span>
										</div>

										<button className = "card__likes card__likes--active" type="button">
											<i className = "far fa-heart text-danger"></i>
											<span>100k</span>
										</button>
									</div>
								</div>

								<div className = "card">
									<a href="item.html" className = "card__cover">
										<img src={itemImg4} alt=""/>
									</a>
									<h3 className = "card__title"><a href="item.html">Let's Go The Navy Blue Galaxies</a></h3>
									<div className = "card__author card__author--verified">
										<img src={avatarImg4} alt=""/>
										<a href="author.html">@humphrey124</a>
									</div>
									<div className = "card__info">
										<div className = "card__price">
											<span>Sale price</span>
											<span>7.87 ETH</span>
										</div>

										<button className = "card__likes" type="button">
											<i className = "far fa-heart"></i>
											<span>50k</span>
										</button>
									</div>
								</div>

								<div className = "card">
									<a href="https://www.youtube.com/watch?v=ckHzmP1evNU"
										className = "card__cover card__cover--video open-video">
										<img src={itemImg3} alt=""/>
										<i className = "far fa-video"></i>
									</a>
									<h3 className = "card__title"><a href="item.html">3D Ethereum In Diamond</a></h3>
									<div className = "card__author card__author--verified">
										<img src={avatarImg3} alt=""/>
										<a href="author.html">@sheilagne22</a>
									</div>
									<div className = "card__info">
										<div className = "card__price">
											<span>Sale price</span>
											<span>5.39 ETH</span>
										</div>

										<button className = "card__likes" type="button">
											<i className = "far fa-heart"></i>
											<span>10k</span>
										</button>
									</div>
								</div>

								<div className = "card">
									<a href="item.html" className = "card__cover">
										<img src={itemImg2} alt=""/>
									</a>
									<h3 className = "card__title"><a href="item.html">Fantacy Of Water Drop</a></h3>
									<div className = "card__author card__author--verified">
										<img src={avatarImg2} alt=""/>
										<a href="author.html">@kimberly120</a>
									</div>
									<div className = "card__info">
										<div className = "card__price">
											<span>Sale price</span>
											<span>3.66 ETH</span>
										</div>

										<button className = "card__likes" type="button">
											<i className = "far fa-heart"></i>
											<span>1k</span>
										</button>
									</div>
								</div>

							</div>

							<button className = "main__nav main__nav--prev" data-nav="#explore" type="button">
								<FaIcons.FaArrowLeft />
							</button>
							<button className = "main__nav main__nav--next" data-nav="#explore" type="button">
								<FaIcons.FaArrowRight />
							</button>
						</div>
					</div>
					{/* end carousel */}
				</div>
			</div>
		</section>
    )
}

export default TopCollections