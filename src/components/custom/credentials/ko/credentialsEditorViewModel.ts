import * as ko from "knockout";
import template from "./credentialsEditorView.html";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";
import { credentialsModel } from "../credentialsModel";
import { widgetEditorSelector } from "..";


@Component({
    selector: widgetEditorSelector,
    template: template
})
export class credentialsEditor implements WidgetEditor<credentialsModel> {
    public readonly sessionNumber: ko.Observable<string>;

    constructor() {
        this.sessionNumber = ko.observable();
    }

    @Param()
    public model: credentialsModel;

    @Event()
    public onChange: (model: credentialsModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.sessionNumber(this.model.sessionNumber);
        this.sessionNumber.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.sessionNumber = this.sessionNumber();
        this.onChange(this.model);
    }
}