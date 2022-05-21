import { cloneElement, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import useOnClickOutside from 'use-onclickoutside';

import StyledDropDown from './StyledDropDown';
import {Dropdown} from "./types";


const DropDown = ({ children }: Dropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => { setIsOpen(!isOpen) };

  const handleClickOutside = () => { setIsOpen(false) };
  useOnClickOutside(ref, handleClickOutside);

  const close = () => { setIsOpen(false) };

  return (
    <StyledDropDown ref={ref}>
      <div className="container">
        <div
          onClick={toggleDropdown}
        >
          <>
            {
              isOpen ?
                <FontAwesomeIcon
                  className="icon"
                  icon={faAngleUp}
                />
                :
                <FontAwesomeIcon
                  className="icon"
                  icon={faAngleDown}
                />
            }
          </>
          { children[0] }
        </div>
        <div>
          {
            isOpen ?
              cloneElement(children[1], { handleclosefromchild: () => close()})
              :
              null
          }
        </div>
      </div>
    </StyledDropDown>
  )
}

export default DropDown;
