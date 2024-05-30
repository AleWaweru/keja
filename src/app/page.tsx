"use client"

import { store } from "@/state/store";
import { Provider } from "react-redux";
import HomePage from "../components/Home/Home"

export default function Home() {
  return (
    <Provider store={store}>
     <HomePage/>
    </Provider>
  );
}
