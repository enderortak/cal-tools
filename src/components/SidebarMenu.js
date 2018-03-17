import React from "react";
import { Menu, Input, Label, Icon, Header } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const menu = {
  submenus: [
    {
      title: "Data Analysis",
      icon: "chart bar",
      items: [
        {
          title: "Record Plotter Tool",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Ecotorq Data Analyzer",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Map Extrapolation",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Signal Filters",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "GinnOBD Tool",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Data Merge Tool",
          path: "/excelmerger",
          disabled: false,
          isNew: true,
        },
      ],
    },
    {
      title: "File Operations",
      icon: "copy",
      items: [
        {
          title: ".mat File Merger",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: ".rec File Merger",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: ".dat File Merger",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Dyno .csv generator",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "rec2mat Converter",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "dat2mat Converter",
          path: null,
          disabled: true,
          isNew: false,
        },
      ],
    },
    {
      title: "Calibration Aid",
      icon: "life ring",
      items: [
        {
          title: "Carry-over Companion",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "INCA setBase",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Calibration Comparison",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Zero Torque Check",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Min. Injection Overlap",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Offline Torque Matching",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "TT Report",
          path: null,
          disabled: true,
          isNew: false,
        },
      ],
    },
    {
      title: "Data Visualization",
      icon: "chart area",
      items: [
        {
          title: "Plot Palette",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Compressor Map Plotter",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Surface Fitting Tool",
          path: null,
          disabled: true,
          isNew: false,
        },
        {
          title: "Residency Plotter",
          path: null,
          disabled: true,
          isNew: false,
        },
      ],
    },
  ],
};

export default class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textFilter: "",
    };
    this.isSubMenuVisible = this.isSubMenuVisible.bind(this);
    this.isSubMenuItemVisible = this.isSubMenuItemVisible.bind(this);
  }
  isSubMenuVisible(submenu, filter) {
    return submenu.items.filter(i => this.isSubMenuItemVisible(i, filter)).length > 0;
  }
  isSubMenuItemVisible(item, filter) {
    return item.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  }
  render() {
    return (
      <React.Fragment>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." onChange={(e, d) => this.setState(() => ({ textFilter: d.value }))} />
        </Menu.Item>
        <Menu.Item as={Link} to="/" onClick={this.props.hideBar} >
          <Header inverted><Icon className="home" />Home</Header>
        </Menu.Item>
        {
          menu.submenus.map((sm, smi) =>
            (
               this.isSubMenuVisible(sm, this.state.textFilter) &&
               <Menu.Item key={smi}>
                 <Header as="h4" inverted><Icon className={sm.icon} />{sm.title}</Header>
                 <Menu.Menu>
                   {
                    sm.items.map((i, ind) => (
                       this.isSubMenuItemVisible(i, this.state.textFilter) &&
                       <Menu.Item
                         key={ind}
                         as={i.disabled ? "div" : NavLink}
                         disabled={i.disabled}

                         to={i.path}
                         onClick={this.props.hideBar}
                       >
                         {i.title}
                         {i.isNew && <Label color="red">New!</Label>}

                       </Menu.Item>

                    ))
                  }
                 </Menu.Menu>
               </Menu.Item>
            ))
        }
      </React.Fragment>
    );
  }
}

