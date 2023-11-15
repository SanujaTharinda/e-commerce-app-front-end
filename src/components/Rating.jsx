import React, { Component } from 'react';

class Rating extends Component {

    render() {
        const { rating, message } = this.props;
        return (
            <div>
                {this.reviewStars(rating)}
                {message && message}
            </div>
        );
    }

    reviewStars(rating) {
        const totalStars = 5;
        let colored = Math.floor(rating);
        let halfColored = rating - colored;
        let stars = [];
        for(let i=0; i < totalStars; i++){
            stars.push(
                    <span key = {`rating-star-${i}`}>
                        <i
                            className ={
                                    (i < colored ? "fas fa-star" :
                                    i = colored && halfColored !==0 ?
                                    "fas fa-star-half-alt":
                                    "far fa-star") +
                                    " star mb-1 mr-1"
                            }
                        >
                        </i>
                    </span>);
        }

        return stars;
    };
}

export default Rating;