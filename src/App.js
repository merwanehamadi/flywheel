import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CrudModule from "./crud_module/v3/CrudModule";
import { useParams } from "react-router-dom";

function toCamelCase(str) {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}


function ModuleDetail() {
    const { moduleName } = useParams();

    // Convert moduleName to CamelCase for the component's name
    const componentName = toCamelCase(moduleName);
    // Form the dynamic path
    const componentPath = `./${moduleName}/v1/${componentName}`;

    const DynamicComponent = React.lazy(() => import(`${componentPath}`));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DynamicComponent />
        </Suspense>
    );
}


function App() {
    return (
        <Router>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <h1>Gargantua</h1>
                <div style={{ display: "flex", flexGrow: 1, flexWrap: 'nowrap' }}> {/* Added flexWrap */}
                    <div style={{ flex: '0 0 30%', overflowY: "auto" }}> {/* Modified this line */}
                        <CrudModule />
                    </div>
                    <div style={{ flex: '0 0 70%', overflowY: "auto", borderLeft: "1px solid #ddd" }}> {/* Modified this line */}
                        <Routes>
                            <Route path="/:moduleName" element={<ModuleDetail />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}



export default App;
