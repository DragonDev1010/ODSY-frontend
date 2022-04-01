import Collection from './Collection'

import * as FaIcons from 'react-icons/fa'

function TopCollections() {
    return (
        <section className = "topCollections">
			{/* title */}
			<div className = "title">
				<h2>Top Collections</h2>
				<button className='normal'>See All</button>
			</div>
			{/* end title */}

			{/* carousel */}
			<div className = "main__carousel-wrap">
				<button className = "main__nav main__nav--prev" data-nav="#explore" type="button">
					<FaIcons.FaAngleLeft/>
				</button>

				<div className = "main__carousel main__carousel--topCollections owl-carousel" id="explore">
					<Collection name="David" balance="100"/>
					<Collection name="Denis" balance="500"/>
				</div>

				<button className = "main__nav main__nav--next" data-nav="#explore" type="button">
					<FaIcons.FaAngleRight />
				</button>
			</div>
			{/* end carousel */}
		</section>
    )
}

export default TopCollections