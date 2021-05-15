import React from "react";
import GeneralSettings from "Components/ProfileSettings/GeneralSettings/GeneralSettings";
import MenuItemHeader from "Components/ProfileSettings/MenuItemHeader/MenuItemHeader";
import MenuItemLoader from "Components/ProfileSettings/MenuItemLoader/MenuItemLoader";
import styles from "./ProfileSettings.scss";

const MENU_CONFIG = [
  {
    key: "general",
    label: "General",
    header: "General settings",
    component: GeneralSettings,
  },
];

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenuItem: MENU_CONFIG[0],
    };

    props.fetchUserData(props.userId);
  }

  handleMenuSelection = (selectedMenuItem) => {
    this.setState({ selectedMenuItem });
  };

  render() {
    const { isLoading } = this.props;
    const { selectedMenuItem } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.menu_container}>
          <p className={styles.menu_header}>Menu</p>
          <ul className={styles.menu}>
            {MENU_CONFIG.map((item) => (
              <li
                key={item.key}
                className={`
                  ${item.key === selectedMenuItem.key ? styles.selected_item : ""}
                `}
                onClick={() => this.handleMenuSelection(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.display_section}>
          <MenuItemHeader>{selectedMenuItem.header}</MenuItemHeader>
          {isLoading ? (
            <MenuItemLoader />
          ) : (
            <this.state.selectedMenuItem.component {...this.props} />
          )}
        </div>
      </div>
    );
  }
}

export default ProfileSettings;
