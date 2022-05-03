import { useState } from 'react'

import bscLogo from '../../assets/image/explorerPage/bscLogo.svg'
import solLogo from '../../assets/image/explorerPage/solLogo.png'
import ethLogo from '../../assets/image/explorerPage/ethLogo.png'
import polyLogo from '../../assets/image/explorerPage/polyLogo.png'

function Filter() {
	const [chain, setChain] = useState(null)
	const [cat, setCat] = useState(null)
	const [rarity, setRarity] = useState(null)
	const [price, setPrice] = useState(null)
	const [currency, setCur] = useState(null)
	const [sort, setSort] = useState(null)
	
	const priceRange = [
		[0.1, 0.5, 1, 5], 
		[1, 5, 10, 15], 
		[0.033, 0.2, 0.35, 1], 
		[50, 155, 410, 1000]
	]

	function parseChain(c) {
		switch (c) {
			case 0: return 'BSC'; break;
			case 1: return 'SOL'; break;
			case 2: return 'ETH'; break;
			case 3: return 'POLY'; break;							
			default:break;
		}
	}
	function parseCat(c) {
		switch (c) {
			case 0: return 'Art'; break;
			case 1: return 'Artifacts & Relics'; break;
			case 2: return 'Gaming'; break;
			case 3: return 'Metaverse'; break;
			case 4: return 'Photography'; break;
			default: break;
		}
	}
	function parseRarity(r) {
		switch (r) {
			case 0:return 'All'; break;
			case 1:return 'Top 50'; break;
			case 2:return 'Top 100'; break;
			case 3:return 'Top 500'; break;
			case 4:return 'Top 1000'; break;
			default: break;
		}
	}
	function parsePrice(c, p) {
		switch (c) {
			case 0:
				switch (p) {
					case 0: return '< ' + priceRange[0][0].toString() + ' BSC'; break;
					case 1: return '< ' + priceRange[0][1].toString() + ' BSC'; break;
					case 2: return '< ' + priceRange[0][2].toString() + ' BSC'; break;
					case 3: return '< ' + priceRange[0][3].toString() + ' BSC'; break;
					default: break;
				}
				break;
			case 1:
				switch (p) {
					case 0: return '< ' + priceRange[1][0].toString() + ' SOL'; break;
					case 1: return '< ' + priceRange[1][1].toString() + ' SOL'; break;
					case 2: return '< ' + priceRange[1][2].toString() + ' SOL'; break;
					case 3: return '< ' + priceRange[1][3].toString() + ' SOL'; break;
					default: break;
				}
				break;
			case 2:
				switch (p) {
					case 1: return '< ' + priceRange[2][1].toString() + ' ETH'; break;
					case 2: return '< ' + priceRange[2][2].toString() + ' ETH'; break;
					case 3: return '< ' + priceRange[2][3].toString() + ' ETH'; break;
					case 0: return '< ' + priceRange[2][0].toString() + ' ETH'; break;
					default: break;
				}
				break;
			case 3:
				switch (p) {
					case 0: return '< ' + priceRange[3][0].toString() + ' POLY'; break;
					case 1: return '< ' + priceRange[3][1].toString() + ' POLY'; break;
					case 2: return '< ' + priceRange[3][2].toString() + ' POLY'; break;
					case 3: return '< ' + priceRange[3][3].toString() + ' POLY'; break;
					default: break;
				}
				break;
			default:
				return 'Price Range'
				break;
		}
	}
	function parseSort(s) {
		switch (s) {
			case 0: return 'Price:Low to High'; break;
			case 1: return 'Price:High to low'; break;
			case 2: return 'Common to rare'; break;
			case 3: return 'Rare to common'; break;
			case 4: return 'Recently Listed'; break;
			default: break;
		}
	}
    return(
		<div style={{display: "flex", justifyContent: "space-evenly", marginBottom: '100px'}}>
			<div className = "filterCover">
				<button className = "normal">
					{chain === null ? 'Blockchain' : parseChain(chain)}
				</button>
				<div className = "dropContent">
					<button onClick={() => setChain(0)}> <img src= {bscLogo} width="20" height="15"/> BSC</button>
					<button onClick={() => setChain(1)}> <img src= {solLogo} width="20" height="15"/> Solana</button>
					<button onClick={() => setChain(2)}> <img src= {ethLogo} width="20" height="15"/> ETH</button>
					<button onClick={() => setChain(3)}> <img src= {polyLogo} width="20" height="15"/> Poly</button>
				</div>
			</div>
			<div className = "filterCover">
				<button className = "normal">
					{cat === null ? 'Categories' : parseCat(cat)}
				</button>
				<div className = "dropContent">
					<button onClick={() => setCat(0)}> Art</button>
					<button onClick={() => setCat(1)}> Artifacts & Relics</button>
					<button onClick={() => setCat(2)}> Gaming</button>
					<button onClick={() => setCat(3)}> Metaverse</button>
					<button onClick={() => setCat(4)}> Photography</button>
				</div>
			</div>
			<div className = "filterCover">
				<button className = "normal">
					{rarity === null ? 'Rarity' : parseRarity(rarity)}
				</button>
				<div className = "dropContent">
					<button onClick={() => setRarity(0)}> All</button>
					<button onClick={() => setRarity(1)}> Top 50</button>
					<button onClick={() => setRarity(2)}> Top 100</button>
					<button onClick={() => setRarity(3)}> Top 500</button>
					<button onClick={() => setRarity(4)}> Top 1000</button>
				</div>
			</div>
			<div className = "filterCover">
				<button className = "normal">
					{price === null ? 'Price Range' : parsePrice(currency, price)}
				</button>
				{
					currency === null ?
					<div className = "dropContent">
						<button onClick={() => setCur(0)}> <img src= {bscLogo} width="20" height="15"/> BSC</button>
						<button onClick={() => setCur(1)}> <img src= {solLogo} width="20" height="15"/> Solana</button>
						<button onClick={() => setCur(2)}> <img src= {ethLogo} width="20" height="15"/> ETH</button>
						<button onClick={() => setCur(3)}> <img src= {polyLogo} width="20" height="15"/> Poly</button>
					</div>
					:
					<div className = "dropContent">
						<button onClick={() => setCur(null)}>Switch Currency</button>
						<button onClick={() => setPrice(0)}>{parsePrice(currency, 0)}</button>
						<button onClick={() => setPrice(1)}>{parsePrice(currency, 1)}</button>
						<button onClick={() => setPrice(2)}>{parsePrice(currency, 2)}</button>
						<button onClick={() => setPrice(3)}>{parsePrice(currency, 3)}</button>
					</div>
				}
			</div>
			<div className = "filterCover">
				<button className = "normal">
					{sort === null ? 'Filter & Sort' : parseSort(sort)}
				</button>
				<div className = "dropContent">
					<button onClick={() => setSort(0)}>Price:Low to High</button>
					<button onClick={() => setSort(1)}>Price:High to low</button>
					<button onClick={() => setSort(2)}>Common to rare</button>
					<button onClick={() => setSort(3)}>Rare to common</button>
					<button onClick={() => setSort(4)}>Recently Listed</button>
				</div>
			</div>
			<div className = "filterCover">
				<button className = "normal">Search All</button>
			</div>
		</div>
    )
}

export default Filter