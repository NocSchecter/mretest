import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { AlphaMode, Appearance, Material, User } from '@microsoft/mixed-reality-extension-sdk';

export default class EnableDisable
{
	private model: MRE.Actor = null;
	private buttonEnable: MRE.Actor;
	private buttonDisable: MRE.Actor;
	private assets: MRE.AssetContainer;

	constructor(private context: MRE.Context)
	{
		this.context.onStarted(() => this.started());
	}

	private async started()
	{
		this.assets = new MRE.AssetContainer(this.context);

		const alphaMaterialEnabe = this.assets.createMaterial("alphaMat2",
		{
			color: {r: 0, g: 0.5838819, b: 1, a: 1},
			alphaMode: MRE.AlphaMode.Blend
		});

		const alphaMaterialDisable = this.assets.createMaterial("alphaMat", 
		{
			color: {r: 0.4716981, g: 0.4716981, b: 0.4716981, a: 0.8},
			alphaMode: MRE.AlphaMode.Blend
		});

		const modelData = await this.assets.loadGltf('donia.glb', 'box');

		this.model = MRE.Actor.CreateFromPrefab(this.context, 
		{
			firstPrefabFrom: modelData,
			actor :
			{
				name: "Donia",
				transform:
				{
					local:
					{
						scale: {x: 100, y: 100, z: 100},
						position: {x: 1, y: -1, z: 1}
					}
				},
				appearance: 
				{
					enabled: true,
					materialId: alphaMaterialEnabe.id,
				}
			}
		});

		this.buttonEnable = MRE.Actor.CreatePrimitive(this.assets,
			{
				definition: {shape: MRE.PrimitiveShape.Box},
				actor:
				{
					transform:
					{
						local:
						{
							position: {x: -0.5, y: 0, z: 0},
							scale: {x: 1, y: 1, z: 0.1}
						}
					},
					appearance:
					{
						enabled: true,
						materialId: alphaMaterialEnabe.id
					}
				},

				addCollider: true
			});

			this.buttonEnable.created().then(() =>
			this.buttonEnable.setBehavior(MRE.ButtonBehavior).onClick((User) => this.enable(User)))

		this.buttonDisable = MRE.Actor.CreatePrimitive(this.assets,
			{
				definition: {shape: MRE.PrimitiveShape.Box},
				actor:
				{
					transform:
					{
						local:
						{
							position: {x: 0.5, y: 0, z: 0},
							scale: {x: 1, y: 1, z: 0.1}
						}
					},
					appearance:
					{
						enabled: true,
						materialId: alphaMaterialDisable.id
					}
				},

				addCollider: true
			});
			
			this.buttonDisable.created().then(() =>
				this.buttonDisable.setBehavior(MRE.ButtonBehavior).onClick((User) => this.disable(User)))
	}

	private enable(user: MRE.User)
	{
		this.model.appearance.enabled = true;
		console.log("Activado");
	}

	private disable(user: MRE.User)
	{
		this.model.appearance.enabled = false;
		console.log("Desactivado");
	}
}