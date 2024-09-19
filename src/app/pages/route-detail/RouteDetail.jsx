import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PageWrapper } from '../';
import { DataContext } from '../../store';
import { Error, LoadSpinner } from '../../components';
import { fieldPropNames } from '../routes-page/config';

import './route-detail.css';
import { testData } from './RouteDetail.test';

const {
  NAME,
  GRADE,
  AID_RATING,
  SERIOUSNESS_RATING,
  TYPE,
  PITCHES,
  LENGTH,
  COMMITMENT_GRADE,
  LOCATION,
  DATE_CLIMBED,
  DESCRIPTION,
  GEAR,
} = fieldPropNames;

export default function RouteDetail() {
  const { routeId } = useParams();
  const { data, isLoading, isError, errorMessage } =
    useContext(DataContext).routes;
  // const routeDetail = data.find((route) => route._id === routeId);
  // console.log(routeDetail);
  const routeDetail = testData;
  const gradeTxt = [
    routeDetail[GRADE] ? routeDetail[GRADE].toLowerCase() : '',
    routeDetail[AID_RATING] ? routeDetail[AID_RATING].toUpperCase() : '',
    routeDetail[SERIOUSNESS_RATING]
      ? routeDetail[SERIOUSNESS_RATING].toUpperCase()
      : '',
  ];
  const typeText = [
    routeDetail[TYPE] ? routeDetail[TYPE].toLowerCase() : '',
    routeDetail[PITCHES]
      ? `${routeDetail[PITCHES]} ${
          routeDetail[PITCHES] > 1 ? 'pitches' : 'pitch'
        }`
      : '',
    routeDetail[LENGTH]
      ? routeDetail[LENGTH].toLowerCase().replace(' ', '')
      : '',
    routeDetail[COMMITMENT_GRADE]
      ? routeDetail[COMMITMENT_GRADE].toUpperCase()
      : '',
  ];
  const fullGradeTxt = gradeTxt.filter((txt) => txt).join(' ');
  const fullTypeText = typeText.filter((txt) => txt).join(', ');

  console.log(data);
  console.log(routeDetail);

  const contentNotReady = isLoading ? (
    <div className="display-flex">
      <LoadSpinner />
    </div>
  ) : isError ? (
    <Error message={errorMessage} title="Error occurred getting route" />
  ) : !routeDetail.name ? (
    <Error
      message="There seems to be an error getting the title of the route"
      title="Route not found"
    />
  ) : undefined;

  return (
    <PageWrapper title="Route Detail">
      {contentNotReady || (
        <article className="route-detail-container">
          <div className="grade-container">
            <h3 className="text-xl">{routeDetail[NAME]}</h3>
            <p className="text-md p-margin">
              <span className="route-grade">{fullGradeTxt}</span> -{' '}
              {fullTypeText}
            </p>
          </div>
          {/* <p className="type-container text-sm">{fullTypeText}</p> */}
          <p className="text-sm p-margin">{routeDetail[LOCATION]}</p>
          <section className="description-container">
            <h3 className="text-xl">Description</h3>
            <p className="text-sm p-margin">{routeDetail[DESCRIPTION]}</p>
          </section>
          <section className="description-container">
            <h3 className="text-xl">Gear</h3>
            <p className="text-sm p-margin">{routeDetail[GEAR]}</p>
          </section>
        </article>
      )}
    </PageWrapper>
  );
}

RouteDetail.propTypes = {};
