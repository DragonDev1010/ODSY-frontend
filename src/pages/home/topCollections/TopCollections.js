import Card from './Card'

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
								<Card/>
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