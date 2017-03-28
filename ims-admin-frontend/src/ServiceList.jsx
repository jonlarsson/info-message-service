import React from "react";

export function ServiceList(props) {
  return (
      <div>
        {props.services.map(service =>
            (
                <div key={service.id}>
                  <a href="" onClick={(event) => {
                    event.preventDefault();
                    props.onServiceSelect(service);
                  }}>{service.name}</a>
                </div>
            )
        )}
      </div>
  );
}