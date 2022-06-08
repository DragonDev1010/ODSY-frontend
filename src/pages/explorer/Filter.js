import { useState } from 'react'

import bscLogo from '../../assets/image/explorerPage/bscLogo.png'
import solLogo from '../../assets/image/explorerPage/solLogo.png'
import ethLogo from '../../assets/image/explorerPage/ethLogo.png'
import polyLogo from '../../assets/image/explorerPage/polyLogo.png'

function Filter(props) {
	const [chain, setChain] = useState(null)
	const [cat, setCat] = useState(null)
	const [rarity, setRarity] = useState(null)
	const [minPrice, setMinPrice] = useState(null)
	const [maxPrice, setMaxPrice] = useState(null)
	const [currency, setCur] = useState(0)
	const [sort, setSort] = useState(null)
	const [priceRange, setPriceRange] = useState(null)
	const [resetPrice, setResetPrice] = useState(false)
	const [resetFilter, setResetFilter] = useState(false)

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
			default: return 'Categories'; break;
		}
	}
	function parseRarity(r) {
		switch (r) {
			case 0:return 'Top 50'; break;
			case 1:return 'Top 100'; break;
			case 2:return 'Top 500'; break;
			case 3:return 'Top 1000'; break;
			default: break;
		}
	}
	const applyPriceRange = () => {
		let curSymbol;
		switch (currency) {
			case 0: curSymbol = 'ODSY'; break;
			case 1: curSymbol = 'BNB'; break;
			case 2: curSymbol = 'SOL'; break;
			case 3: curSymbol = 'ETH'; break;
			case 4: curSymbol = 'MATIC'; break;
			default: break;
		}
		let temp = curSymbol + ' : ' + minPrice.toString() + ' ~ ' + maxPrice.toString()
		setPriceRange(temp)
		setResetPrice(true)
	}
	const resetPriceRange = () => {
		setPriceRange(null)
		setCur(0)
		setMinPrice(0)
		setMaxPrice(0)
		setResetPrice(false)
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
	const search = () => {
		let query = {}
		if(chain !== null) query['chainId'] = chain;
		if(cat !== null) query['category'] = cat;
		if(rarity !== null) query['rarity'] = rarity
		if(resetPrice === true) { 
			query['minPrice'] = minPrice; 
			query['maxPrice'] = maxPrice;
			if(currency > 0)
				query['curType'] = 0
			else
				query['curType'] = 1
		}
		if(sort !== null) query['sort'] = sort;
		props.setFilter(query)
		setResetFilter(true)
	}
	const resetSearch = () => {
		setChain(null)
		setCat(null)
		setRarity(null)
		setMinPrice(null)
		setMaxPrice(null)
		setCur(0)
		setSort(null)
		setPriceRange(null)
		setResetPrice(false)
		setResetFilter(false)
		let query = {}
		props.setFilter(query)
	}
    return(
		<div className='nftExplorerFilter'>
			<div className = "filterCover">
				<button className = "normal">
					{chain === null ? 'Blockchain' : parseChain(chain)}
				</button>
				<div className = "dropContent">
					<button onClick={() => { setChain(null)}}>Reset</button>
					<button style={{textAlign: 'left'}} onClick={() => { setChain(0)}}> <img style={{width: '30px', height: '30px', margin: '0 20px 0 4px'}} src= {bscLogo}/> BSC</button>
					<button style={{textAlign: 'left'}} onClick={() => { setChain(1)}}> <img style={{width: '30px', height: '30px', margin: '0 20px 0 4px'}} src= {solLogo}/> Solana</button>
					<button style={{textAlign: 'left'}} onClick={() => { setChain(2)}}> <img style={{width: '30px', height: '30px', margin: '0 20px 0 4px'}} src= {ethLogo}/> ETH</button>
					<button style={{textAlign: 'left'}} onClick={() => { setChain(3)}}> <img style={{width: '30px', height: '30px', margin: '0 20px 0 4px'}} src= {polyLogo}/> Poly</button>
				</div>
			</div>
			<div className = "filterCover">
				<button className = "normal">
					{cat === null ? 'Categories' : parseCat(cat)}
				</button>
				<div className = "dropContent">
					<button onClick={() => setCat(null)}>Reset</button>
					<button onClick={() => setCat(0)}> Art</button>
					<button onClick={() => setCat(1)}> Artifacts</button>
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
					<button onClick={() => setRarity(null)}> Reset</button>
					<button onClick={() => setRarity(0)}> Top 50</button>
					<button onClick={() => setRarity(1)}> Top 100</button>
					<button onClick={() => setRarity(2)}> Top 500</button>
					<button onClick={() => setRarity(3)}> Top 1000</button>
				</div>
			</div>
			<div className = "filterCover">
				<button className = "normal">
					{priceRange === null ? "Price Range" : priceRange}
				</button>
				<div className = "dropContent" style={{padding:'10px'}}>
					<span style={{display:"block", padding:'5px 0'}}>Currency:</span>
					<select style={{width: '90%', color: 'black'}} value={currency} onChange={e=>setCur(+e.target.value)}>
						<option value="0" style={{color: 'black'}}>ODSY</option>
						<option value="1" style={{color: 'black'}}>BNB</option>
						<option value="2" style={{color: 'black'}}>SOL</option>
						<option value="3" style={{color: 'black'}}>ETH</option>
						<option value="4" style={{color: 'black'}}>MATIC</option>
					</select>
					<span style={{display:"block", padding:'5px 0'}}>Min Price:</span>
					<input type="number" value={minPrice === null? 0 : minPrice} style={{width:'90%', background:'white', color:'black'}} onChange={e => setMinPrice(+e.target.value)}></input>
					<span style={{display:"block", padding:'5px 0'}}>Max Price:</span>
					<input type="number" value={maxPrice===null? 0 : maxPrice} style={{width:'90%', background:'white', color:'black'}} onChange={e => setMaxPrice(+e.target.value)}></input>
					{
						minPrice > maxPrice ?
							<p>Minimum must be less than maximum</p>
						:
						!resetPrice ?
							<button className='priceApplyBtn' onClick={applyPriceRange}>Apply</button>
							:
							<button className='priceApplyBtn' onClick={resetPriceRange}>Reset</button>
					}
				</div>
			</div>
			<div className = "filterCover">
				<button className = "normal">
					{sort === null ? 'Filter & Sort' : parseSort(sort)}
				</button>
				<div className = "dropContent">
					<button onClick={() => setSort(null)}>Reset</button>
					<button onClick={() => setSort(0)}>Price:Low to High</button>
					<button onClick={() => setSort(1)}>Price:High to low</button>
					<button onClick={() => setSort(2)}>Common to rare</button>
					<button onClick={() => setSort(3)}>Rare to common</button>
					<button onClick={() => setSort(4)}>Recently Listed</button>
				</div>
			</div>
			<div className = "filterCover">
				{
					!resetFilter ?
					<button className = "normal" onClick={search}>Search All</button>
					:
					<button className = "normal" onClick={resetSearch}>Reset</button>
				}
			</div>
		</div>
    )
}

export default Filter