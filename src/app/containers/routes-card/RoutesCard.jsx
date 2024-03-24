import PropTypes from 'prop-types';
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

  function handleMenuAction(menuAction) {
    if (menuAction === MENU_ACTION_NAMES[EDIT]) {
      setIsEditMode(true);
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
    console.log('inside read more handleClick');
  }

  return (
    <div className="route-card-container">
      <div className="ellipsis-container">
        <EllipsisMenu
          _id={routeData._id}
          menuActionNames={MENU_ACTION_NAMES}
          handleMenuAction={handleMenuAction}
        />
      </div>
      <article className="route-card">
        <div className="route-card-header">
          {routeData.imageCoverUrl && (
            <img
              src={`${routeData.imageCoverUrl}`}
              // src={`${apiUrl}/${routeData.imageCoverUrl}`}
              alt={routeData.name}
              className="route-card-image"
            />
          )}
          <div className="route-card-details">
            <h3 className="route-card-title text-lg">
              {routeData.name}
              <span className="route-card-grade">{routeData.grade}</span>
            </h3>
            <TruncateText
              className="route-card-description text-sm"
              text={routeData.description}
              maxWords={100}
              onClick={handleReadMoreClick}
            />
          </div>
        </div>
        <div className="route-card-gear-beta">
          <h4 className="text-md">Gear beta</h4>
          <p className="text-sm">{routeData.gear}</p>
        </div>
      </article>
    </div>
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
