import React, { useEffect, useRef, useState } from "react";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";

const AccountsUIWrapper = () => {
  const [view, setView] = useState({});
  const containerRef = useRef(null);
  useEffect(() => {
    setView(Blaze.render(Template.loginButtons, containerRef.current));
    return () => {
      Blaze.remove(view);
    };
  }, []);

  return <span ref={containerRef} />;
};

export default AccountsUIWrapper;
