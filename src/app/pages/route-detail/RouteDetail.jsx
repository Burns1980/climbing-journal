import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PageWrapper } from '../';
import { DataContext } from '../../store';
import {
  EditableSection,
  EditButtonIcon,
  Error,
  LoadSpinner,
} from '../../components';
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
  const navigate = useNavigate();
  const { data, isLoading, isError, errorMessage } =
    useContext(DataContext).routes;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const routeDetail = data.find((route) => route._id === routeId);
  // const routeDetail = testData;
  const gradeTxt = routeDetail && [
    routeDetail[GRADE] ? routeDetail[GRADE].toLowerCase() : '',
    routeDetail[AID_RATING] ? routeDetail[AID_RATING].toUpperCase() : '',
    routeDetail[SERIOUSNESS_RATING]
      ? routeDetail[SERIOUSNESS_RATING].toUpperCase()
      : '',
  ];
  const typeText = routeDetail && [
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
  const fullGradeTxt = gradeTxt && gradeTxt.filter((txt) => txt).join(' ');
  const fullTypeText = typeText && typeText.filter((txt) => txt).join(', ');

  function handleEditClick() {
    navigate(`../edit-route/${routeId}`, { relative: 'path' });
  }

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
    <PageWrapper>
      {contentNotReady || (
        <article className="route-detail-container">
          <div className="grade-container">
            <EditButtonIcon handleClick={handleEditClick}>
              <h3 className="text-xl">{routeDetail[NAME]}</h3>
            </EditButtonIcon>
            <p className="text-md p-margin">
              <span className="route-grade">{fullGradeTxt}</span> {fullTypeText}
            </p>
          </div>
          <p className="text-sm p-margin">{routeDetail[LOCATION]}</p>
          <EditableSection
            title="Description"
            content={routeDetail[DESCRIPTION]}
            handleEditClick={handleEditClick}
          />
          <EditableSection
            title="Gear"
            content={routeDetail[GEAR]}
            handleEditClick={handleEditClick}
          />
        </article>
      )}
    </PageWrapper>
  );
}

RouteDetail.propTypes = {};
