import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { newLayoutResponse, backendDataResponse } from './dashboard-mock-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DecimalPipe]
})

export class DashboardComponent implements OnInit {
  // All types and interfaces are defined in the mock response files
  layoutResponse: any;
  backendDataResponse: any;
  fieldDefinitions: any;
  // Decide which sections to show from the data source
  sectionLabels: string[] = ['Overall Metrics', 'Observed Metrics', 'Source Metrics'];
  selectedTab: number = 0;
  isLoading = true;

  constructor(private decimalPipe: DecimalPipe) { }
  // Ignore this function, it is only used to simulate fetching data from an API endpoint
  fetchData(url: string): Promise<any> {
    // Simulate fetching data from an API endpoint
    // For the purpose of this exercise, to mimic the real world scenario, we are using a timeout
    return new Promise<any>((resolve) => {
      setTimeout(() => {
          // URL would be a real API endpoint url
          let response = {};
          if (url === 'layout') {
            response = newLayoutResponse;
          } else if (url === 'dataset') {
            response = backendDataResponse;
          }
          resolve(response);
      }, 500); // Simulate a 1-second delay
    });
  }

  async ngOnInit() {
    // Fetch data from the mocked API endpoints
    try {
      await Promise.all([
        this.fetchData('layout'),
        this.fetchData('dataset'),
      ]).then(([layoutResponse, backendDataResponse]) => {
        this.layoutResponse = layoutResponse;
        this.backendDataResponse = backendDataResponse;
        this.fieldDefinitions = layoutResponse?.fieldDefinitions;
        this.isLoading = false;
        // TODO: Remove Eventually - Testing the data source on page load.
        if (this.backendDataResponse?.dataSets && this.backendDataResponse.dataSets.length > 0) {
          console.log('Data Sets:', this.backendDataResponse.dataSets);
          console.log('Column Elements:', this.layoutResponse.layout[3]?.elements[0]);
        }
      });
    } catch (error) {
      console.error("An error occurred while fetching data :: fetchData :: ", error);
      throw error;
    }
  }
  // =========
  // FUNCTIONS
  // =========

  selectedTabEvent(index: number): void {
    this.selectedTab = index;
  }
  // ====================================================================================================
  // PURPOSE: Format the data item value based on the field definition
  // INPUTS: label: string, value: any; Example: { label: "totalSpend", value : 7625.071235364659 }
  // OUTPUTS: Formatted String based on TYPE; Example: "$7,625"
  // ====================================================================================================
  formatDataTypeValueItem(label: string, value: any): string {
    // TODO: Remove - console.log("formatDataTypeValueItem :: ", { label, value });
    // Cross reference the label with the field definitions to get the data formats
    const fieldDefinition = this.fieldDefinitions[label];
    if (!fieldDefinition) {
      return 'Unknown field';
    }

    //    *** FieldDefinitions ***
    //    label: string;
    //    format: 'datetime' | 'currency' | 'percent' | 'number' | 'none';
    //    type: 'string' | 'double' | 'datetime';
    //    digitsInfo?: string;
    //    aggFn: 'none' | 'sum' | 'average';

    const { format, type, digitsInfo } = fieldDefinition;

    if (format === 'none' && type === 'string') {
      return value;
    } else {
      if (format) {
        switch (format) {
          case 'number':
            return this.decimalPipe.transform(value, digitsInfo || '') || '';
          case 'percent':
            return this.decimalPipe.transform(value, digitsInfo || '') + '%';
          case 'currency':
            const formattedValue = this.decimalPipe.transform(value, digitsInfo) || '';
            return `$${formattedValue}`;
          case 'datetime':
            // NO Datetimes exist in the datasource, but if they did we can use a data pipe to format the date
            return value;
          default:
            // Handle an unknown data type
            return value.toString();
        }
      }
      // console.log("DATA TYPE: ", { format, value });
      return "Unknown data type";
    }
  }

  // ====================================================================================================
  // PURPOSE: Calculates (Sums or Averages) the data item value based on the field definition
  // INPUTS: fieldName: string; Example: "totalSpend"
  // OUTPUTS: Formatted String based on TYPE; Example: "$7,625"
  // ====================================================================================================
  calculateAggregate(fieldName: string): string {
    let aggregateValue = 0;
    let count = 0;
    const fieldDefinition = this.fieldDefinitions[fieldName];
    if (!fieldDefinition || !fieldDefinition.aggFn) {
      return 'Unknown field';
    }
    //    *** FieldDefinitions ***
    //    label: string;
    //    format: 'datetime' | 'currency' | 'percent' | 'number' | 'none';
    //    type: 'string' | 'double' | 'datetime';
    //    digitsInfo?: string;
    //    aggFn: 'none' | 'sum' | 'average';
    const { format, aggFn, digitsInfo } = fieldDefinition;

    // Add up all the values for the field first
    for (const dataItem of this.backendDataResponse?.dataSets[0]?.data) {
      const value = dataItem[fieldName];
      if (typeof value === 'number') {
        aggregateValue += value;
        count++;
      }
    }
    // Check the field definition to see if we need to sum or average the values
    if (aggFn === 'sum') {
      const formattedValue = this.decimalPipe.transform(aggregateValue, digitsInfo) || '';
      if (format === 'currency') {
        return `$${formattedValue}`;
      }
      return formattedValue;
    } else if (aggFn === 'average') {
      if (count === 0) {
        return 'N/A';
      } else {
        const average = aggregateValue / count;
        return this.decimalPipe.transform(average, digitsInfo || '') + '%';
      }
    }
    // Leave as blank string for empty cell.
    return '';
  }  
}
