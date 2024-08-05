import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-actions.component.html',
  styleUrl: './custom-actions.component.css'
})
export class CustomActionsComponent
  implements ICellRendererAngularComp {
  private params: any;
  isCurrentRowEditing: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  agInit(params: any): void {
    this.params = params;
    this.checkEditingState();
  }

  refresh(params: any): boolean {
    this.params = params;
    this.checkEditingState();
    return true;
  }

  checkEditingState() {
    const editingCells = this.params.api.getEditingCells();
    console.log('Check editing: ', editingCells);
    this.isCurrentRowEditing = editingCells.some((cell: any) => cell.rowIndex === this.params.node.rowIndex);
    this.cdr.detectChanges();
  }

  onEdit() {
    console.log('Col key: ', this.params.api.getDisplayedCenterColumns()[0].colId);
    this.params.api.startEditingCell({
      rowIndex: this.params.node.rowIndex,
      colKey: this.params.api.getDisplayedCenterColumns()[0].colId
    });

    // // Force a refresh to update the action buttons
    // setTimeout(() => {
    //   this.params.api.refreshCells({
    //     rowNodes: [this.params.node],
    //     force: true
    //   });
    // });
  }

  onUpdate() {
    this.params.api.stopEditing(false);
    this.params.context.componentParent.onUpdateUser(this.params.node.data);
  }
}