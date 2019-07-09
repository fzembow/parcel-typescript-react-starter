import classNames from 'classnames';
import * as React from 'react';
import * as css from './SeatPickerQuestion.scss';

interface ISeatPickerQuestionState {
  selectedRowIdx?: number;
  selectedSeatName?: string;
  unavailableSeats: string[];
}

const rows = 10;
const seatNames = ['A', 'B', '', 'C', 'D'];

class SeatPickerQuestion extends React.Component<
  null,
  ISeatPickerQuestionState
> {
  constructor(props: null) {
    super(props);

    const unavailableSeats: string[] = [];
    for (let rowIdx = 1; rowIdx <= rows; rowIdx++) {
      for (let colIdx = 0; colIdx < seatNames.length; colIdx++) {
        const seatName = seatNames[colIdx];
        if (seatName && Math.random() < 0.5) {
          unavailableSeats.push(`${rowIdx}${seatName}`);
        }
      }
    }
    this.state = {
      unavailableSeats,
    };
  }

  setChosenSeat = (rowNumber: number, seatName: string) => () => {
    this.setState({
      selectedRowIdx: rowNumber,
      selectedSeatName: seatName,
    });
  };

  render() {
    const { selectedRowIdx, selectedSeatName, unavailableSeats } = this.state;

    const seatNodes = [];
    for (let rowIdx = 1; rowIdx <= rows; rowIdx++) {
      for (let colIdx = 0; colIdx < seatNames.length; colIdx++) {
        const seatName = seatNames[colIdx];
        const isSelected =
          selectedRowIdx === rowIdx && selectedSeatName === seatName;

        const fullSeatName = `${rowIdx}${seatName}`;
        const isUnavailable = unavailableSeats.includes(fullSeatName);

        if (seatName) {
          const className = classNames(css.seat, {
            [css.selected]: isSelected,
            [css.unavailable]: isUnavailable,
          });

          seatNodes.push(
            <div
              key={`${rowIdx}${seatName}`}
              className={className}
              onClick={
                !isUnavailable
                  ? this.setChosenSeat(rowIdx, seatName)
                  : undefined
              }
            >
              {seatName}
            </div>
          );
        } else {
          seatNodes.push(
            <div key={`${rowIdx}${seatName}`} className={css.aisle} />
          );
        }
      }
    }

    return (
      <div className={css.app}>
        <div className={css.container}>
          <div className={css.plane}>{seatNodes}</div>
        </div>
      </div>
    );
  }
}

export default SeatPickerQuestion;
