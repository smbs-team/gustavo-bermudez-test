import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { Layout, SEO } from "../../components";
import { getComic } from "../../redux/actionCreators/comics";
import { Row, Col } from "react-flexbox-grid";
import { Link } from "gatsby";
import { getIdFromURI } from "../../utils/getIdFromURI";
import DetailContainer from "../../components/container";

const ComicImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
`;

const Comic = (props) => {
  const { getComic, params, comic } = props;
  const comicId = params?.id || 0;

  useEffect(() => {
    getComic(comicId);
  }, [getComic, comicId]);

  return (
    <Layout>
      <SEO title="Comic Detail" />

      <DetailContainer>
        {comic && (
          <React.Fragment>
            <h2 style={{ textAlign: "center" }}>{comic.title}</h2>

            <Row>
              <Col md={4}>
                <ComicImg
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt="comic"
                />
              </Col>
              <Col md={8}>
                <p>{comic.description}</p>

                <Row>
                  {comic.images.map((_image) => (
                    <Col md={3}>
                      <img
                        style={{ width: 250, height: 250 }}
                        src={`${_image.path}.${_image.extension}`}
                        alt="comic"
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <br />

            <Row>
              <Col md={6}>
                <h2 style={{ textAlign: "center" }}>Comic's Characters</h2>

                <ul>
                  {comic.characters.items.map((_char, index) => (
                    <li key={index}>
                      <Link
                        to={`/characters/${getIdFromURI(_char.resourceURI)}`}
                      >
                        {_char.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>

              <Col md={6}>
                <h2 style={{ textAlign: "center" }}>Comic's Stories</h2>

                <ul>
                  {comic.stories.items.map((_story, index) => (
                    <li key={index}>
                      <Link to={`/story/${getIdFromURI(_story.resourceURI)}`}>
                        {_story.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </DetailContainer>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  comic: state.entities.selectedComic,
});

const mapDispatchToProps = (dispatch) => ({
  getComic: bindActionCreators(getComic, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comic);
