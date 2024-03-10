import React, { useState } from "react";
import { breakFast } from "../data/mindData";

const MindItems = () => {
  const [mindItems, setMindItems] = useState(breakFast);

  return (
    <section className="mindSection">
      {mindItems.map((item) => {
        return (
          <div key={item.id} className="gallery">
            <div className="imgBox">
              <img src={item.item_img} alt={item.item_name} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MindItems;
