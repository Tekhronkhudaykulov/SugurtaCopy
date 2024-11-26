import { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { _routes } from "./_routes";
import "react-lazy-load-image-component/src/effects/opacity.css";
import PrivateRoute from "./PrivateRoute";
import { initApp } from "../helpers/api";
import { CheckInternet } from "../components";

const Router = () => {
  initApp();

  return (
    <HashRouter>
      <Suspense>
        <Routes>
          {_routes?.map(({ path, element: Component, childs }, idx) =>
            childs && childs?.length > 0 ? (
              <Route
                key={idx}
                path={path}
                element={<PrivateRoute child={<Component />} />}
              >
                {childs?.map(({ path, element: Component }, c) => (
                  <Route key={c} path={path} element={<Component />} />
                ))}
              </Route>
            ) : (
              <Route
                key={idx}
                path={path}
                element={<PrivateRoute child={<Component />} />}
              />
            )
          )}
        </Routes>
        <CheckInternet />
      </Suspense>
    </HashRouter>
  );
};

export default Router;
