import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style.css";
import { TabProps, TabsProps } from "./type";

export function Tabs({
    children,
    ariaLabel,
    radius = "md",
    variant = "light",
    color = "default",
    size = "md",
    className = "",
    background = "transparent",
}: TabsProps) {
    const tabItems = Array.isArray(children) ? children : [children];
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string | number>(
        tabItems.find(tab => tab.props.path === location.pathname)?.props.tabKey ||
        tabItems[0]?.props?.tabKey || ""
    );

    return (
        <div className={`tabs-container ${className}`} style={{ background }}>
            {/* Tab List */}
            <ul
                className={`tab-list radius-${radius} variant-${variant} color-${color}`}
                role="list"
                aria-label={ariaLabel}
            >
                {tabItems.map((tab) => {
                    const tabProps = tab.props || {};
                    const isActive = activeTab === tabProps.tabKey;

                    return (
                        <li key={tabProps.tabKey} className="flex gap-2 text-center">
                            {tabProps.path ? (
                                <NavLink
                                    to={tabProps.path}
                                    className={({ isActive }) =>
                                        `tab-button-tab-component size-${tabProps.size || size}
                                        radius-${tabProps.radius || radius}
                                        variant-${tabProps.variant || variant}
                                        color-${tabProps.color || color}
                                        ${isActive ? "tab-button-tab-component-active" : ""}
                                        ${tabProps.className || ""}`
                                    }
                                    role="tab"
                                >
                                    {tabProps.icon && <span>{tabProps.icon}</span>}
                                    <span className="flex items-center gap-2">
                                        {tabProps.title}
                                        {tabProps.tag && <span className="tab-badge">{tabProps.tag}</span>}
                                    </span>
                                </NavLink>
                            ) : (
                                <button
                                    className={`tab-button-tab-component size-${tabProps.size || size}
                                  radius-${tabProps.radius || radius}
                                  variant-${tabProps.variant || variant}
                                  color-${tabProps.color || color}
                                  ${isActive ? "tab-button-tab-component-active" : ""}
                                  ${tabProps.className || ""}`}
                                    onClick={() => {
                                        setActiveTab(tabProps.tabKey);
                                        if (typeof tabProps.onClick === 'function') {
                                            tabProps.onClick();
                                        }
                                    }}
                                    role="tab"
                                    aria-selected={isActive}
                                >
                                    {tabProps.icon && <span>{tabProps.icon}</span>}
                                    <span className="flex items-center gap-2">
                                        {tabProps.title}
                                        {tabProps.tag && <span className="tab-badge">{tabProps.tag}</span>}
                                    </span>
                                </button>

                            )}
                        </li>
                    );
                })}
            </ul>

            {/* Tab Content */}
            <div className={`tab-content radius-${radius}`}>
                {tabItems.map((tab) =>
                    tab.props.tabKey === activeTab && !tab.props.path ? (
                        <div key={tab.props.tabKey}>{tab.props.children}</div>
                    ) : null
                )}
            </div>
        </div>
    );
}

export function Tab({
    children,
    className = "",
    background = "transparent",
}: TabProps) {
    return (
        <div className={`tab-container ${className}`} style={{ background }}>
            {children}
        </div>
    );
}
