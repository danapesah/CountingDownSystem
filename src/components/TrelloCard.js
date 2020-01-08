import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {Draggable} from "react-beautiful-dnd"
import * as moment from 'moment';

const toPercent = num => Number(num).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
const TrelloCard=({text ,id, index, flag, duration, percentage, passed})=>{
    return (
      <Draggable draggableId={String(id)} index={index}>
        {provided =>(
          <div ref = {provided.innerRef} {...provided.draggableProps }
          {...provided.dragHandleProps}>
            <Card style={flag ? styles.activeCardContainer : (passed ?styles.passedCardContainer: styles.cardContainer)} >
            <CardContent>
              <Typography  gutterBottom>
                {moment.utc(duration.as('milliseconds')).format("HH:mm:ss")} <br></br>
              {text} <br></br>
              {toPercent(percentage)}
              </Typography>
            </CardContent>
          </Card>
          </div>
        )}

      </Draggable>
    )
}

const styles = {
  cardContainer:
  {
    marginBottom:8,
  },
  activeCardContainer:
  {
    backgroundColor: 'green',
    marginBottom:8
  },
  passedCardContainer:
  {
    backgroundColor: 'pink',
    marginBottom:8
  }
}
export default TrelloCard;
