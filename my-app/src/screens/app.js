import { Routes, Route } from "react-router-dom"
import { Home } from "./home.screens"
import { Feedback } from "./feedback.screns"
import { LoginScreen } from "./login.screens"
import { RegisterScreen } from "./register.screens"
import { ViewScreen } from "./viewUser.screens"
import { AddUser } from "./addUser.screens"

export const App = () => {
    return(
        <Routes>
            <Route path="/" element={<LoginScreen />} ></Route>
            <Route path="/register" element={<RegisterScreen />} ></Route>
            <Route path="/home" element={<Home />} ></Route>
            <Route exact path="/home/view/:status" element={<ViewScreen />} ></Route>
            <Route exact path="/home/add/:status" element={<AddUser />} ></Route>
            <Route exact path="home/course/:id" element={<Feedback />}></Route>
        </Routes>
    )
}