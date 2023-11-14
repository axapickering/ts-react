import React, { useState } from "react";
import { StringLiteral } from "typescript";
import { v4 as uuid } from 'uuid';

/** Form for adding box.
 *
 * Props:
 * - createBox: fn to call in parent
 *
 * State:
 * formData: { height, width, backgroundColor }
 *
 * BoxList -> NewBoxForm
 */

interface NewBoxFormInterface {
  createBox: Function
}

interface FormDataInterface {
  height: string;
  width: string;
  backgroundColor:string;
}

function NewBoxForm({ createBox }:NewBoxFormInterface):JSX.Element {

  const [formData, setFormData] = useState<FormDataInterface>({
    height: "",
    width: "",
    backgroundColor: "",
  });

  /** Update form input. */
  function handleChange(evt):void {
    const { name, value } = evt.target as {name:string,value:string};
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Submit form: call function from parent & clear inputs. */
  function handleSubmit(evt):void {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData({ height: "", width: "", backgroundColor: "" });
  }

  return (
      <div className="NewBoxForm">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newBox-height">Height</label>
            <input
                id="newBox-height"
                onChange={handleChange}
                name="height"
                value={formData.height}
            />
          </div>
          <div>
            <label htmlFor="newBox-width">Width</label>
            <input
                id="newBox-width"
                onChange={handleChange}
                name="width"
                value={formData.width}
            />
          </div>
          <div>
            <label htmlFor="newBox-backgroundColor">Background Color</label>
            <input
                id="newBox-backgroundColor"
                onChange={handleChange}
                name="backgroundColor"
                value={formData.backgroundColor}
            />
          </div>
          <button className="NewBoxForm-addBtn">Add a new box!</button>
        </form>
      </div>
  );
}

export default NewBoxForm;
