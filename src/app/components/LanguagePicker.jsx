import React, { useContext } from "react";
import { LocaleContext } from "../../contexts/LocaleContext";

const LanguagePicker = ({ changeLanguage }) => {
  const context = useContext(LocaleContext);
  return (
    <div className="form-group w-25">
      <select
        className="form-control"
        id="language"
        defaultValue={context.lang}
        onChange={changeLanguage}
      >
        <option value="ca">CA</option>
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
};

export default LanguagePicker;
