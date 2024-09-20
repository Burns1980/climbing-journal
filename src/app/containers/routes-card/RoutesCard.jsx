import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { TruncateText } from '../../components';
import { EllipsisMenu } from '..';
import { apiUrl } from '../../../utils/envVars';
import './routes-card.css';
import { useState } from 'react';

const MENU_ACTION_NAMES = ['edit', 'hide', 'favorite'];
const EDIT = 0;
const HIDE = 1;
const FAVORITE = 2;

const RoutesCard = ({ routeData }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    _id,
    name,
    grade,
    aidRating,
    seriousnessRating,
    description,
    gear,
    imageCoverUrl,
  } = routeData;
  const fullRating =
    (grade ? `- ${grade}` : '') +
    (aidRating ? ` ${aidRating}` : '') +
    (seriousnessRating ? ` ${seriousnessRating}` : '');

  function handleMenuAction(menuAction) {
    if (menuAction === MENU_ACTION_NAMES[EDIT]) {
      setIsEditMode(true);

      //////////////////////////
      console.log(routeData._id);

      console.log(`the ${routeData.name} edit modal should open now`);
    }
    if (menuAction === MENU_ACTION_NAMES[HIDE]) {
      console.log(`the ${routeData.name} hide was clicked`);
    }
    if (menuAction === MENU_ACTION_NAMES[FAVORITE]) {
      console.log(`the ${routeData.name} favorite was clicked`);
    }
  }

  function handleReadMoreClick() {
    console.log('location ', location);
    navigate(`${location.pathname}/${_id}`);
  }

  return (
    <article className="route-card-container">
      <div className="ellipsis-container">
        <EllipsisMenu
          _id={_id}
          menuActionNames={MENU_ACTION_NAMES}
          handleMenuAction={handleMenuAction}
        />
      </div>
      <div className="route-card">
        <div className="route-card-header">
          {imageCoverUrl && (
            <img
              src={`${imageCoverUrl}`}
              // src={`${apiUrl}/${routeData.imageCoverUrl}`}
              alt={name}
              className="route-card-image"
            />
          )}
          <div className="route-card-details">
            <h3 className="route-card-title text-lg">
              <Link to={_id}>{name}</Link>
              <span className="route-card-grade text-md">{fullRating}</span>
            </h3>
            <TruncateText
              className="route-card-description text-sm"
              text={description}
              maxWords={100}
              onClick={handleReadMoreClick}
            />
          </div>
        </div>
        <div className="route-card-gear-beta">
          <h4 className="text-md">Gear beta</h4>
          <p className="text-sm">{gear}</p>
        </div>
      </div>
    </article>
  );
};

RoutesCard.propTypes = {
  routeData: PropTypes.shape({
    imageCover: PropTypes.string,
    name: PropTypes.string.isRequired,
    grade: PropTypes.string,
    description: PropTypes.string,
    gear: PropTypes.string,
  }).isRequired,
};

export default RoutesCard;
