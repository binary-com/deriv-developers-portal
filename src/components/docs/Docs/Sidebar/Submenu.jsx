import  { useState } from 'react';
import { Link } from 'react-router-dom';

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);
  
    const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div to={item.title} onClick={item.subNav && showSubnav}>
        <div>
          <div>{item.title}</div>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav}
        </div>
      </div>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              {item.icon}
              <div>{item.title}</div>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
