import React, { Component } from "react";
import ClickyItem from "../ClickyItem";
import Image from "../../utils/image-class"
import { Col, Row, Container } from "../Grid"

class GameController extends Component {
    state = {
        images: [
            new Image("/assets/Images/Anjanath.png", "Anjanath"),
            new Image("/assets/Images/Barroth.png", "Barroth"),
            new Image("/assets/Images/Bazelgeuse.png", "Bazelgeuse"),
            new Image("/assets/Images/Diablos.png", "Diablos"),

            new Image("/assets/Images/Gajalaka.png", "Gajalaka"),
            new Image("/assets/Images/Jyuratodus.png", "Jyuratadus"),
            new Image("/assets/Images/kestodon.png", "Kestodon"),
            new Image("/assets/Images/Legiana.png", "Legiana"),

            new Image("/assets/Images/Paolumu.png", "Paolumu"),
            new Image("/assets/Images/Rathian.png", "Rathian"),
            new Image("/assets/Images/tigrex_magma.png", "Tigrex Magma"),
            new Image("/assets/Images/Vaal_Hazak.png", "Vaal Hazak")
        ],
        currentScore: 0,
        topScore: 0,
        align:{textAlign: "right"}
    }

    handleClick = index => {
        if (this.state.images[index].clicked) {
            const top = this.state.topScore;
            this.setState({ currentScore: 0, topScore: top });
            this.resetClicked();
        } else {
            const current = this.state.currentScore + 1;

            if (current > this.state.topScore) {
                this.setState({ topScore: current });
            }
            this.setState({
                currentScore: current,
                images: this.state.images.map((e, i) => {
                    if (i === index) {
                        e.clicked = true;
                    }
                    return e;
                })
            });
        }
        this.randomizePictures();
    }

    resetClicked = () => {
        this.setState({
            images: this.state.images.map((e) => {
                e.clicked = false;
                return e;
            })
        })
    }

    randomizePictures = () => {
        const array = this.state.images;
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        this.setState({ images: array });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="sm-12">
                        <h1 className="text-center">Memory Game</h1>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-12">
                        <p className="text-center">Try to click them all without repeating!</p>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-6">
                        <h4 >Your Current Score: {this.state.currentScore}</h4>
                    </Col>
                    <Col size="sm-6" style={this.state.align}>
                        <h4 className="text-right">Your Top Score: {this.state.topScore}</h4>
                    </Col>
                </Row>
                <Row>
                    {this.state.images.map((e, i) => (
                        <Col size="md-4 sm-6" className="text-centered"key ={i}>
                            <ClickyItem {...e} key={i} onClick={() => this.handleClick(i)} />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default GameController;