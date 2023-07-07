import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render page', () => {
    expect(component).toBeTruthy();
  });

  it('should format data item value based on field definition', waitForAsync(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Test case 1: Testing for format 'none' and type 'string'
    const label1 = 'channel';
    const value1 = 'Affiliate';
    const expectedValue1 = 'Affiliate';
    expect(component.formatDataTypeValueItem(label1, value1)).toEqual(expectedValue1);
  
    // Test case 2: Testing for format 'number'
    const label2 = 'ordersI';
    const value2 = 15879;
    const expectedValue2 = '15,879';
    expect(component.formatDataTypeValueItem(label2, value2)).toEqual(expectedValue2);
  
    // Test case 3: Testing for format 'percent'
    const label3 = 'percInc';
    const value3 = 0.0767;
    const expectedValue3 = '0.08%';
    expect(component.formatDataTypeValueItem(label3, value3)).toEqual(expectedValue3);
  
    // Test case 4: Testing for format 'currency'
    const label4 = 'totalSpend';
    const value4 = 7625.071235364659;
    const expectedValue4 = '$7,625';
    expect(component.formatDataTypeValueItem(label4, value4)).toEqual(expectedValue4);
  
  }));

  it('should calculate aggregate value based on field definition', waitForAsync(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Test case 1: Testing for field with aggFn 'sum' and format 'currency'
    const fieldName1 = 'totalSpend';
    const expectedValue1 = '$774,476';
    expect(component.calculateAggregate(fieldName1)).toEqual(expectedValue1);

    // Test case 2: Testing for field with aggFn 'sum' and format 'number'
    const fieldName2 = 'ordersI';
    const expectedValue2 = '27,900';
    expect(component.calculateAggregate(fieldName2)).toEqual(expectedValue2);
  
    // Test case 3: Testing for field with aggFn 'average' and format 'percent'
    const fieldName3 = 'percOrdersI';
    const expectedValue3 = '0.05%';
    expect(component.calculateAggregate(fieldName3)).toEqual(expectedValue3);
  }));
  
});
