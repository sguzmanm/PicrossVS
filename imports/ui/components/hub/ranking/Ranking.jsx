import React from "react";
import { PropTypes } from "prop-types";
import "./Ranking.scss";

const Ranking = props => {

    const compareUsers = (userA, userB) => {
        return userB.score - userA.score
    }
    const sortedUsers = () => {
        return props.users.sort(compareUsers)
    }
    return (
        <div className='ranking'>
            <h2 className="ranking__title">Global Ranking</h2>
            {sortedUsers().map((user) => {
                return <div key={user._id} className="ranking__user">
                    <p className="ranking__username">{user.username}</p>
                    <p className="ranking__score">{user.score}</p>
                </div>
            })}
        </div>
    );
};

// Export with props from backend

export default Ranking;

Ranking.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
