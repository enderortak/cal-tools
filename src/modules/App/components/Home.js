import React from "react";
import { Header, Icon, Item, Grid } from "semantic-ui-react";

const HomeComponent = () => (
  <Grid>
    <Grid.Column width={16} stretched>
      <Header as="h2" icon>
        <Icon name="settings" />
    Calibration Tools
        <Header.Subheader>
    Productivity tools to save your time
        </Header.Subheader>
      </Header>
    </Grid.Column>
    <Grid.Column width={16}>
      <Header as="h3">
        <Icon name="newspaper" />
    News
      </Header>
      <Item.Group divided>
        <Item>
          <Item.Content content="Data Merge Tool migrated to desktop application" verticalAlign="middle" />
          <Item.Meta content="13.03.2018" />
        </Item>
        <Item>
          <Item.Content content="Calibration Tools desktop application released" verticalAlign="middle" />
          <Item.Meta content="12.03.2018" />
        </Item>
      </Item.Group>
    </Grid.Column>
  </Grid>
);

export default HomeComponent;
