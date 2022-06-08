import { useEffect, useState } from "react"
import getImageData from "../../actions/getImageData"
function ApproveUsers() {
    const [users, setUsers] = useState(null)
    const getUsers = () => {
        fetch( process.env.REACT_APP_API_BASE_URL + 'users')
        .then( res => res.json() )
        .then( res => {
            if(res.length > 0)
                setUsers(res)
        })
    }
    const handleClick = (e) => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'user/' + e.target.value,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({approved: !e.target.checked})
            }
        ).then(() => getUsers())
    }
    useEffect(() => {
        getUsers()
    }, [])
    return(
        <div className="approveUserCover">
            <div className="header">
                <div className="avatarHead"></div>
                <div className="nameHead">Name</div>
                <div className="walletHead">Address</div>
                <div className="approvedHead">Approved</div>
            </div>
            <ul className="userList">
            {
                users &&
                users.map(user => (
                    <div className="userRow">
                        <div className="avatar">
                            <img src={getImageData(user.avatar.data.data)}></img>
                        </div>
                        <div className="name">{user.name}</div>
                        <div className="wallet">{user.wallet.substr(0, 6) + ' . . . ' + user.wallet.substr(-4)}</div>
                        <div className="approved">{user.approved ? 'Approved' : 'Not Approved'}</div>
                        <button 
                            value={user.wallet} 
                            checked={user.approved}
                            onClick={e => handleClick(e, 'value', 'checked')}
                            className={user.approved ? 'selectedBtn' : 'nonSelectedBtn'}
                        >
                            {user.approved ? 'Remove' : 'Approve'}
                        </button>
                    </div>
                ))
            }
            </ul>
        </div>
    )
}

export default ApproveUsers