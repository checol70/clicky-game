import React, { Component } from "react";
import ClickyItem from "../ClickyItem";
import Image from "../../utils/image-class";
import { Col, Row, Container } from "../Grid";

import Anjanath from "../../assets/Images/Anjanath.png";
import Barroth from "../../assets/Images/Barroth.png"
import Bazelgeuse from "../../assets/Images/Bazelgeuse.png"
import Diablos from "../../assets/Images/Diablos.png"

import Gajalaka from "../../assets/Images/Gajalaka.png"
import Jyuratodus from "../../assets/Images/Jyuratodus.png"
import Kestodon from "../../assets/Images/kestodon.png"
import Legiana from "../../assets/Images/Legiana.png"

import Paolumu from "../../assets/Images/Paolumu.png"
import Rathian from "../../assets/Images/Rathian.png"
import TigrexMagma from "../../assets/Images/tigrex_magma.png"
import VaalHazak from "../../assets/Images/Vaal_Hazak.png"

class GameController extends Component {
    state = {
        images: [
            new Image(Anjanath, "Anjanath"),
            new Image(Barroth, "Barroth"),
            new Image(Bazelgeuse, "Bazelgeuse"),
            new Image(Diablos, "Diablos"),

            new Image(Gajalaka, "Gajalaka"),
            new Image(Jyuratodus, "Jyuratadus"),
            new Image(Kestodon, "Kestodon"),
            new Image(Legiana, "Legiana"),

            new Image(Paolumu, "Paolumu"),
            new Image(Rathian, "Rathian"),
            new Image(TigrexMagma, "Tigrex Magma"),
            new Image(VaalHazak, "Vaal Hazak")
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